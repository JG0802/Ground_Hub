package com.ce.back.repository;

import com.ce.back.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    // 팀 ID로 포지션 조회
    List<Game> findByTeamId(Long teamId);

    // 사용자 ID로 포지션 조회
    List<Game> findByUserId(Long userId);
}