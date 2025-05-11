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
    public ResponseEntity<List<Team>> getTeamsByTeamName(@PathVariable String teamName) {
        List<Team> teams = teamService.getTeamsByTeamName(teamName);
        return ResponseEntity.ok(teams);
    }

    // 새로운 팀 추가
    // http://localhost:8080/api/teams/create-team
    @PostMapping("/create-team")
    public ResponseEntity<?> createTeam(@RequestBody Team team) {
        try {
            Team newTeam = teamService.createTeam(team);
            return ResponseEntity.ok(newTeam);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }

    }

    // 팀 정보 수정
    // http://localhost:8080/api/teams/update-team
    @PostMapping("/update-team")
    public ResponseEntity<?> updateTeam(@RequestBody Team team) {
        try {
            Team updatedTeam = teamService.updateTeam(team);
            return ResponseEntity.ok(updatedTeam);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    // 특정 팀에 속한 사용자들 조회
    // http://localhost:8080/api/teams/{teamId}/users-in-team
    @GetMapping("/{teamId}/users")
    public ResponseEntity<?> getUsers(@PathVariable Long teamId) {
        try {
            // 팀을 서비스에서 조회
            Team team = teamService.getTeamByTeamId(teamId);

            // 팀에 속한 사용자 목록 반환
            List<User> users = team.getUsers();
            return ResponseEntity.ok(users); // 사용자 목록 반환
        } catch (RuntimeException e) {
            // 팀을 찾지 못한 경우 예외 메시지를 반환
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}