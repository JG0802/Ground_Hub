package com.ce.back.repository;

import com.ce.back.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    // 팀 이름을 포함한 모든 팀을 리스트로 반환
    List<Team> findByTeamNameContaining(String teamName);

    // 팀 이름과 팀 ID로 팀을 찾음 (기본키는 하나의 팀만 반환)
    Optional<Team> findByTeamNameAndTeamId(String teamName, String teamId);

    // 팀 ID로 팀을 찾음
    Optional<Team> findByTeamId(String teamId);
}