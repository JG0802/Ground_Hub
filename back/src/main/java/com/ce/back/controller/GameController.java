package com.ce.back.controller;

import com.ce.back.entity.Game;
import com.ce.back.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // 특정 팀의 경기 일정을 조회하는 메서드
    // http://localhost:8080/api/games/team/{teamId}
    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Game>> getGameByTeamId(@PathVariable Long teamId) {
        List<Game> games = gameService.getGamesByTeamId(teamId);
        if (games.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(games);
    }

    // 특정 사용자가 참가하는 경기 목록 출력
    // http://localhost:8080/api/games/team/{teamId}
    @GetMapping("/user/{userMail}")
    public ResponseEntity<List<Game>> getGameByUser(@PathVariable String userMail) {
        List<Game> games = gameService.getGamesByUserMail(userMail);
        if (games.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(games);
    }

    // 경기 생성
    // http://localhost:8080/api/games/create-game
    @PostMapping("/create-game")
    public ResponseEntity<?> createGame(@RequestBody Game game) {
        try {
            Game savedGame = gameService.createGame(game);
            return ResponseEntity.ok(savedGame);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    // 경기에서의 포지션을 변경
    // http://localhost:8080/api/games/update-game
    @PostMapping("/update-game")
    public ResponseEntity<?> changePosition(@RequestBody Game game) {
        try {
            Game savedGame = gameService.updateGame(game);
            return ResponseEntity.ok(savedGame);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    // 경기 Id로 특정 경기 조회
    // http://localhost:8080/api/games/saved-formation
    @GetMapping("/saved-formation/{gameId}")
    public ResponseEntity<?> getSavedFormation(@PathVariable Long gameId) {
        try {
            Optional<Game> game = gameService.getGameByGameId(gameId);
            return ResponseEntity.ok(game);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    // 경기에 사용자 추가
    // http://localhost:8080/api/games/{userMail}/insert-to-game
    @PostMapping("/{userMail}/insert-to-game")
    public ResponseEntity<?> insertUserToGame(@PathVariable String userMail, @RequestBody Game game) {
        try {
            // 경기에 사용자 추가 로직 호출
            gameService.insertUserToGame(game.getGameId(), userMail); // game.getGameId()로 게임을 찾고 userMail로 사용자 추가

            // 성공적으로 추가된 게임 정보 반환
            return ResponseEntity.ok(game);
        } catch (RuntimeException e) {
            // 예외 발생 시 400 에러 반환 (사용자 또는 경기 관련 예외 처리)
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}