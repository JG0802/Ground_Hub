package com.ce.back.service;

import com.ce.back.entity.Game;
import com.ce.back.entity.Team;
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

    // 팀으로 포지션 조회
    public List<Game> getGameByTeamId(String teamId) {
        return gameRepository.findByTeam_TeamId(teamId);
    }

    // 사용자 ID로 포지션 조회
    public List<Game> getGameByUserMail(String userMail) {
        return gameRepository.findByPlayers_UserMail(userMail);
    }

    // 포지션 추가
    public Game changePosition(Game game) {
        return gameRepository.save(game);
    }
}