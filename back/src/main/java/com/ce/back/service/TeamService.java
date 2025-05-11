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
    public List<Team> getTeamsByTeamName(String teamName) {
        return teamRepository.findTeamsByTeamName(teamName);
    }

    // 팀 검색 : 팀 식별자로 조회
    public Team getTeamByTeamId(Long teamId) {
        return teamRepository.findTeamByTeamId(teamId)
                .orElseThrow(() -> new RuntimeException("팀을 찾을 수 없습니다")); // 예외 처리
    }

    // 새로운 팀 생성
    public Team createTeam(Team team) {
        // 동일한 ID를 가진 팀이 존재하는지 확인
        if (teamRepository.existsById(team.getTeamId())) {
            throw new RuntimeException("팀을 생성할 수 없습니다.");
        }
        return teamRepository.save(team); // 새로운 팀 저장
    }

    // 팀 정보 업데이트
    public Team updateTeam(Team team) {
        // 팀이 존재하는지 확인
        Team existingTeam = teamRepository.findTeamByTeamId(team.getTeamId())
                .orElseThrow(() -> new RuntimeException("팀을 찾을 수 없습니다."));

        // 기존 팀 정보 업데이트
        existingTeam.setTeamName(team.getTeamName());
        existingTeam.setLocation(team.getLocation());
        existingTeam.setFirstColor(team.getFirstColor());
        existingTeam.setSecondColor(team.getSecondColor());
        // 기타 필요한 필드 업데이트

        return teamRepository.save(existingTeam); // 업데이트된 팀 저장
    }
}