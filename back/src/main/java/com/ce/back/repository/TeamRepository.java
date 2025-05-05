package com.ce.back.repository;

import com.ce.back.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {

    // 팀 이름을 포함한 모든 팀을 리스트로 반환
    List<Team> findTeamsByTeamName(String teamName);

    // 팀 ID로 팀을 찾음
    Optional<Team> findTeamByTeamId(Long teamId);
}