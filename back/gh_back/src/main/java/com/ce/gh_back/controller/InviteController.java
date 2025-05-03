package com.ce.gh_back.controller;

import com.ce.gh_back.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/invite")
public class InviteController {

    private final FileService fileService;
    private final String INVITE_CODES_FILE = "inviteCodes.json";
    private final String USERS_FILE = "users.json";

    @Autowired
    public InviteController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createInvite(@RequestBody Map<String, Object> body) {
        String inviteCode = (String) body.get("inviteCode");
        String formation = (String) body.get("formation");
        String username = (String) body.get("username");
        Boolean isPrivate = (Boolean) body.get("isPrivate");

        if (inviteCode == null || formation == null || username == null) {
            return ResponseEntity.badRequest().body("초대코드, 포메이션, 사용자 이름이 필요합니다.");
        }

        List<Map<String, Object>> invites = fileService.readJsonFile(INVITE_CODES_FILE);
        if (invites.stream().anyMatch(invite -> inviteCode.equals(invite.get("inviteCode")))) {
            return ResponseEntity.badRequest().body("이미 존재하는 초대코드입니다.");
        }

        invites.add(Map.of(
                "inviteCode", inviteCode,
                "formation", formation,
                "users", List.of(username),
                "positions", List.of(),
                "isPrivate", isPrivate
        ));
        fileService.writeJsonFile(INVITE_CODES_FILE, invites);

        return ResponseEntity.ok("초대코드가 생성되었습니다.");
    }

    @PostMapping("/users")
    public ResponseEntity<?> getInviteUsers(@RequestBody Map<String, String> body) {
        String inviteCode = body.get("inviteCode");

        if (inviteCode == null) {
            return ResponseEntity.badRequest().body("초대코드가 필요합니다.");
        }

        List<Map<String, Object>> invites = fileService.readJsonFile(INVITE_CODES_FILE);

        Optional<Map<String, Object>> invite = invites.stream()
                .filter(i -> inviteCode.equals(i.get("inviteCode")))
                .findFirst();

        if (invite.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("success", false, "message", "초대코드와 관련된 사용자가 없습니다."));
        }

        // JSON 데이터에서 "users" 필드를 추출
        Object users = invite.get().get("users");

        if (!(users instanceof List)) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "데이터 형식 오류: users 필드가 리스트가 아닙니다."));
        }

        return ResponseEntity.ok(Map.of("success", true, "users", users));
    }

    @PostMapping("/positions")
    public ResponseEntity<?> getInvitePositions(@RequestBody Map<String, String> body) {
        String inviteCode = body.get("inviteCode");

        // 초대코드 유효성 검증
        if (inviteCode == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "초대코드가 필요합니다."
            ));
        }

        // JSON 파일에서 데이터 읽기
        List<Map<String, Object>> invites = fileService.readJsonFile(INVITE_CODES_FILE);
        Optional<Map<String, Object>> inviteOptional = invites.stream()
                .filter(invite -> inviteCode.equals(invite.get("inviteCode")))
                .findFirst();

        // 초대코드가 존재하지 않는 경우
        if (inviteOptional.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of(
                    "success", false,
                    "message", "초대코드가 존재하지 않습니다."
            ));
        }

        // 초대코드와 연결된 포지션 및 포메이션 데이터 반환
        Map<String, Object> invite = inviteOptional.get();
        List<Map<String, Object>> positions = (List<Map<String, Object>>) invite.get("positions");

        // `selected`를 `user`로 변환하여 반환
        List<Map<String, Object>> formattedPositions = positions.stream()
                .map(position -> Map.of(
                        "position", position.get("position"),
                        "user", position.get("selected") // `selected`를 `user`로 매핑
                ))
                .toList();

        String formation = (String) invite.get("formation");

        // 성공적으로 데이터 반환
        return ResponseEntity.ok(Map.of(
                "success", true,
                "formation", formation,
                "positions", formattedPositions
        ));
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveInvitePositions(@RequestBody Map<String, Object> body) {
        String inviteCode = (String) body.get("inviteCode");
        List<Map<String, Object>> positions = (List<Map<String, Object>>) body.get("positions");

        // 입력 데이터 검증
        if (inviteCode == null || positions == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "입력 데이터가 유효하지 않습니다."
            ));
        }

        // 초대코드 파일 읽기
        List<Map<String, Object>> invites = fileService.readJsonFile(INVITE_CODES_FILE);
        Optional<Map<String, Object>> inviteOptional = invites.stream()
                .filter(invite -> inviteCode.equals(invite.get("inviteCode")))
                .findFirst();

        // 초대코드 확인
        if (inviteOptional.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of(
                    "success", false,
                    "message", "초대코드가 존재하지 않습니다."
            ));
        }

        // 초대코드에 포지션 저장
        Map<String, Object> invite = inviteOptional.get();
        invite.put("positions", positions);
        fileService.writeJsonFile(INVITE_CODES_FILE, invites);

        // 성공 응답 반환
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "포지션 데이터가 저장되었습니다."
        ));
    }

    @PostMapping("/user-codes")
    public ResponseEntity<?> getUserInviteCodes(@RequestBody Map<String, String> body) {
        String username = body.get("username");

        if (username == null) {
            return ResponseEntity.badRequest().body("사용자 이름이 필요합니다.");
        }

        List<Map<String, Object>> invites = fileService.readJsonFile(INVITE_CODES_FILE);
        List<String> userCodes = invites.stream()
                .filter(invite -> ((List<String>) invite.get("users")).contains(username))
                .map(invite -> (String) invite.get("inviteCode"))
                .toList();

        return ResponseEntity.ok(Map.of("success", true, "inviteCodes", userCodes));
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinInvite(@RequestBody Map<String, String> body) {
        String inviteCode = body.get("inviteCode");
        String username = body.get("username");

        if (inviteCode == null || username == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "초대코드와 사용자 이름이 필요합니다."
            ));
        }

        List<Map<String, Object>> invites = fileService.readJsonFile(INVITE_CODES_FILE);
        Optional<Map<String, Object>> invite = invites.stream()
                .filter(i -> inviteCode.equals(i.get("inviteCode")))
                .findFirst();

        if (invite.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of(
                    "success", false,
                    "message", "팀이 존재하지 않습니다."
            ));
        }

        Map<String, Object> inviteData = invite.get();

        @SuppressWarnings("unchecked")
        List<String> users = (List<String>) inviteData.get("users");

        // Check if the user is already in the team
        if (!users.contains(username)) {
            users.add(username);
            inviteData.put("users", users);
            fileService.writeJsonFile(INVITE_CODES_FILE, invites);
        }

        // Return the formation of the team
        String formation = (String) inviteData.get("formation");

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "팀에 성공적으로 참여했습니다.",
                "formation", formation
        ));
    }

    @PostMapping("/usersAndPositions")
    public ResponseEntity<?> getUsersAndPositions(@RequestBody Map<String, String> body) {
        String inviteCode = body.get("inviteCode");

        if (inviteCode == null) {
            return ResponseEntity.badRequest().body("초대코드가 필요합니다.");
        }

        List<Map<String, Object>> users = fileService.readJsonFile(USERS_FILE);
        List<Map<String, Object>> invites = fileService.readJsonFile(INVITE_CODES_FILE);

        Optional<Map<String, Object>> invite = invites.stream()
                .filter(i -> inviteCode.equals(i.get("inviteCode")))
                .findFirst();

        if (invite.isEmpty()) {
            return ResponseEntity.status(404).body("초대코드가 존재하지 않습니다.");
        }

        List<String> userList = (List<String>) invite.get().get("users");
        Map<String, Object> userPositions = userList.stream()
                .collect(Collectors.toMap(
                        user -> user,
                        user -> users.stream()
                                .filter(u -> user.equals(u.get("username")))
                                .findFirst()
                                .map(u -> u.get("positions"))
                                .orElse(null)
                ));

        return ResponseEntity.ok(Map.of(
                "success", true,
                "users", userList,
                "positions", userPositions
        ));
    }

    @GetMapping("/getTeams")
    public ResponseEntity<?> getUserTeams(@RequestParam String username) {
        if (username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "사용자 이름이 필요합니다."
            ));
        }

        List<Map<String, Object>> invites = fileService.readJsonFile(INVITE_CODES_FILE);

        // 사용자가 속한 팀 찾기
        List<Map<String, String>> userTeams = invites.stream()
                .filter(invite -> ((List<String>) invite.get("users")).contains(username))
                .map(invite -> Map.of(
                        "inviteCode", (String) invite.get("inviteCode"),
                        "formation", (String) invite.get("formation")
                ))
                .toList();

        return ResponseEntity.ok(Map.of(
                "success", true,
                "teams", userTeams
        ));
    }
}