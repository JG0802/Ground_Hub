package com.ce.back.service;

import com.ce.back.entity.Game;
import com.ce.back.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final GameRepository gameRepository;

    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    // 팀 ID로 포지션 조회
    public List<Game> getgamesByTeam(Long teamId) {
        return gameRepository.findByTeamId(teamId);
    }

    // 사용자 ID로 포지션 조회
    public List<Game> getgamesByUser(Long userId) {
        return gameRepository.findByUserId(userId);
    }

    // 포지션 추가
    public Game addgame(Game game) {
        return gameRepository.save(game);
    }
}