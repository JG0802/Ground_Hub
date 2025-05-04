package com.ce.back.controller;

import com.ce.back.entity.Team;
import com.ce.back.entity.User;
import com.ce.back.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    // 팀 전체 목록 조회
    // http://localhost:8080/api/teams/
    @GetMapping("/")
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.getAllTeams();
        return ResponseEntity.ok(teams);
    }

    // 특정 팀 이름이 포함된 모든 팀 조회
    // http://localhost:8080/api/teams/{teamName}
    @GetMapping("/{teamName}")
    public ResponseEntity<List<Team>> getTeamsByNameContaining(@PathVariable String teamName) {
        List<Team> teams = teamService.getTeamsByNameContaining(teamName);
        if (teams.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(teams);
    }

    // 새로운 팀 추가
    // http://localhost:8080/api/teams/create-team
    @PostMapping("/create-team")
    public ResponseEntity<Team> addTeam(@RequestBody Team team) {
        Team savedTeam = teamService.addTeam(team);
        return ResponseEntity.ok(savedTeam);
    }

    // 팀 이름으로 사용자 리스트 조회
    // http://localhost:8080/api/teams/users-in-team
    @PostMapping("/users-in-team")
    public ResponseEntity<?> getInviteUsers(@RequestBody Map<String, String> body) {
        String teamName = body.get("teamName");
        String teamId = body.get("teamId");

        if (teamName == null && teamId == null) {
            return ResponseEntity.badRequest().body("팀 이름과 팀 식별자가 필요합니다.");
        }

        Optional<Team> teamOptional = teamService.getTeamByTeamNameAndTeamId(teamName, teamId);

        if (teamOptional.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("success", false, "message", "팀 이름과 관련된 사용자가 없습니다."));
        }

        Team team = teamOptional.get();
        List<User> users = team.getUsers(); // 'users' 필드로 팀의 사용자 리스트 반환

        return ResponseEntity.ok(Map.of("success", true, "users", users));
    }
}