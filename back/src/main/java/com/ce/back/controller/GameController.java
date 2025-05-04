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

    // 특정 팀의 경기 일정을 조회하는 메서드
    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Game>> getGameByTeamId(@PathVariable String teamId) {
        List<Game> games = gameService.getGameByTeamId(teamId);
        if (games.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(games);
    }

    // 특정 사용자가 참가하는 경기 목록 출력
    @GetMapping("/user/{userMail}")
    public ResponseEntity<List<Game>> getGameByUser(@PathVariable String userMail) {
        List<Game> games = gameService.getGameByUserMail(userMail);
        if (games.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(games);
    }

    // 경기에서의 포지션을 변경하는 메소드
    // http://localhost:8080/
    @PostMapping("/update-game")
    public ResponseEntity<Game> changePosition(@RequestBody Game game) {
        Game savedGame = gameService.changePosition(game);
        return ResponseEntity.ok(savedGame);
    }
}