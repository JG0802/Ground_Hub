package com.ce.back.controller;

import com.ce.back.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final FileService fileService;
    private final String USERS_FILE = "users.json";

    @Autowired
    public UserController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, Object> body) {
        String username = (String) body.get("username");
        String password = (String) body.get("password");
        String tel = (String) body.get("tel");
        String birth = (String) body.get("birth");
        List<String> positions = (List<String>) body.get("positions");

        if (username == null || password == null || tel == null || birth == null || positions == null || positions.size() != 3) {
            return ResponseEntity.badRequest().body("입력 데이터가 유효하지 않습니다.");
        }

        List<Map<String, Object>> users = fileService.readJsonFile(USERS_FILE);
        if (users.stream().anyMatch(user -> username.equals(user.get("username")))) {
            return ResponseEntity.badRequest().body("이미 존재하는 사용자입니다.");
        }

        users.add(Map.of("username", username, "password", password, "tel", tel, "birth", birth, "positions", positions));
        fileService.writeJsonFile(USERS_FILE, users);

        return ResponseEntity.ok("회원가입 성공!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("아이디와 비밀번호를 입력하세요.");
        }

        List<Map<String, Object>> users = fileService.readJsonFile(USERS_FILE);
        Map<String, Object> user = users.stream()
                .filter(u -> username.equals(u.get("username")) && password.equals(u.get("password")))
                .findFirst()
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(401).body("잘못된 아이디 또는 비밀번호입니다.");
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/check-user")
    public ResponseEntity<?> check_User(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String tel = body.get("tel");
        String birth = body.get("birth");

        if (username == null || tel == null || birth == null) {
            return ResponseEntity.badRequest().body("사용자 정보를 모두 입력하세요.");
        }

        List<Map<String, Object>> users = fileService.readJsonFile(USERS_FILE);
        Map<String, Object> user = users.stream()
                .filter(u -> username.equals(u.get("username")) && tel.equals(u.get("tel")) && birth.equals(u.get("birth")))
                .findFirst()
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(401).body("존재하지 않은 사용자입니다.");
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/repassword")
    public ResponseEntity<?> rePassword(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("newPassword");
        String passwordCheck = body.get("passwordCheck");

        if (password == null || passwordCheck == null) {
            return ResponseEntity.badRequest().body("비밀번호를 모두 입력하세요.");
        }

        if (!password.equals(passwordCheck)) {
            return ResponseEntity.badRequest().body("비밀번호가 동일하지 않습니다.");
        }

        // JSON 파일에서 사용자 목록 읽기
        List<Map<String, Object>> users = fileService.readJsonFile(USERS_FILE);

        // 해당 사용자 찾기
        boolean userFound = false;
        for (Map<String, Object> user : users) {
            if (username.equals(user.get("username"))) {
                if (password.equals(user.get("password"))) {
                    return ResponseEntity.status(404).body("기존과 동일한 비밀번호입니다.");
                }
                user.put("password", password); // 비밀번호 변경
                userFound = true;
                break;
            }
        }

        if (!userFound) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        // 변경된 내용 JSON 파일에 다시 저장
        fileService.writeJsonFile(USERS_FILE, users);
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }

    @PostMapping("/update-positions")
    public ResponseEntity<?> updatePositions(@RequestBody Map<String, Object> body) {
        String username = (String) body.get("username");
        List<String> positions = (List<String>) body.get("positions");

        if (username == null || positions == null || positions.size() != 3) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "올바른 데이터를 입력하세요."));
        }

        // JSON 파일에서 사용자 목록 읽기
        List<Map<String, Object>> users = fileService.readJsonFile(USERS_FILE);

        // 해당 사용자 찾기
        boolean userFound = false;
        for (Map<String, Object> user : users) {
            if (username.equals(user.get("username"))) {
                user.put("positions", positions); // 포지션 업데이트
                userFound = true;
                break;
            }
        }

        if (!userFound) {
            return ResponseEntity.status(404).body(Map.of("success", false, "message", "사용자를 찾을 수 없습니다."));
        }

        // 변경된 내용 JSON 파일에 다시 저장
        fileService.writeJsonFile(USERS_FILE, users);
        return ResponseEntity.ok(Map.of("success", true, "message", "포지션이 성공적으로 변경되었습니다."));
    }
}