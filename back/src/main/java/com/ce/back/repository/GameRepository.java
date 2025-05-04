package com.ce.back.repository;

import com.ce.back.entity.Game;
import com.ce.back.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {

    // 팀 ID로 포지션 조회
    List<Game> findByTeam_TeamId(String teamId);

    // 사용자 ID로 포지션 조회
    List<Game> findByPlayers_UserMail(String userMail);

    Optional<Game> findByGameName(String gameName);
}