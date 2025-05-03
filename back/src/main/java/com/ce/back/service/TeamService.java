package com.ce.back.service;

import com.ce.back.entity.Team;
import com.ce.back.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    // 모든 팀 조회
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    // 특정 팀 조회
    public Optional<Team> getTeamById(Long teamId) {
        return teamRepository.findById(teamId);
    }

    // 새로운 팀 추가
    public Team addTeam(Team team) {
        return teamRepository.save(team);
    }
}