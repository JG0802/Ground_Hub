package com.ce.back.service;

import com.ce.back.entity.Game;
import com.ce.back.entity.Team;
import com.ce.back.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    // 로고 파일을 저장할 경로 (application.properties에서 설정)
    @Value("${team.logo.directory}")
    private String logoDirectory;

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
    public Optional<Team> getTeamByTeamId(Long teamId) {
        Optional<Team> existingTeam = teamRepository.findTeamByTeamId(teamId);

        // isEmpty()를 사용하여 값이 없는 경우 처리
        if (existingTeam.isEmpty()) {
            throw new RuntimeException("경기를 찾을 수 없습니다.");
        }

        return existingTeam;
    }

    // 팀 검색 : 사용자 메일로 조회
    public List<Team> getTeamsByUserMail(String userMail) {
        return teamRepository.findByUsersUserMail(userMail);
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

    // 로고 파일 저장 메소드
    public String saveLogoFile(MultipartFile file) throws IOException {
        // 파일명 생성 (중복 방지)
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // 파일을 지정된 경로에 저장
        Path path = Paths.get(logoDirectory, fileName);

        // 디렉토리가 없으면 생성
        Files.createDirectories(path.getParent());

        // 파일 복사
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }
}