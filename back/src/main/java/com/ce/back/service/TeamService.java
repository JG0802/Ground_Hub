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

    // 특정 팀 이름이 포함된 모든 팀 조회
    public List<Team> getTeamsByNameContaining(String teamName) {
        return teamRepository.findByTeamNameContaining(teamName);
    }

    // 팀 검색 : 팀 이름과 팀 식별자로 조회
    public Optional<Team> getTeamByTeamNameAndTeamId(String teamName, String teamId) {
        return teamRepository.findByTeamNameAndTeamId(teamName, teamId);
    }

    // 새로운 팀 추가
    public Team addTeam(Team team) {
        return teamRepository.save(team);
    }
}