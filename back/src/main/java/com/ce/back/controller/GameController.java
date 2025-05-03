package com.ce.back.controller;

import com.ce.back.entity.Game;
import com.ce.back.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/positions")
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // 특정 팀의 모든 포지션을 조회하는 메서드
    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Game>> getgamesByTeam(@PathVariable Long teamId) {
        List<Game> games = gameService.getgamesByTeam(teamId);
        if (games.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(games);
    }

    // 특정 사용자가 맡고 있는 포지션을 조회하는 메서드
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Game>> getgamesByUser(@PathVariable Long userId) {
        List<Game> games = gameService.getgamesByUser(userId);
        if (games.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(games);
    }

    // 새로운 포지션을 추가하는 메서드
    @PostMapping("/add")
    public ResponseEntity<Game> addgame(@RequestBody Game game) {
        Game savedgame = gameService.addgame(game);
        return ResponseEntity.ok(savedgame);
    }
}