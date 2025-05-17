package com.ce.back.service;

import com.ce.back.entity.Game;
import com.ce.back.entity.Team;
import com.ce.back.entity.User;
import com.ce.back.repository.GameRepository;
import com.ce.back.repository.TeamRepository;
import com.ce.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public GameService(GameRepository gameRepository, UserRepository userRepository, TeamRepository teamRepository) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
    }

    // 팀 이름으로 경기 찾기
    public List<Game> getGamesByTeamName(String teamName) {
        return gameRepository.findGamesByTeam_TeamName(teamName);
    }

    // 팀 ID로 경기 찾기
    public List<Game> getGamesByTeamId(Long teamId) {
        return gameRepository.findGamesByTeam_TeamId(teamId);
    }

    // 사용자 이메일로 포지션 조회
    public List<Game> getGamesByUserMail(String userMail) {
        return gameRepository.findGamesByPlayers_UserMail(userMail);
    }

    // 로고 파일을 저장하는 메소드
    public String saveLogoFile(MultipartFile file) throws IOException {
        // 파일을 로컬 디렉토리에 저장
        String directory = "back/uploads/logos/";  // 로고 저장할 경로
        Path dirPath = Paths.get(directory);
        // 디렉토리가 없으면 생성
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath);
        }

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(directory + fileName);

        // 파일 저장
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName; // 저장된 파일명 반환
    }

    // 경기 생성
    public Game createGame(Game game) {
        // 경기 중복 체크(게임 이름과 팀을 기준으로)
        Optional<Game> existingGame = gameRepository.findGamesByGameName(game.getGameName())
                .stream()
                .filter(g -> g.getTeam().equals(game.getTeam())) // 같은 팀의 동일한 경기라면 중복 처리
                .findFirst();

        if (existingGame.isPresent()) {
            throw new RuntimeException("이미 존재하는 경기입니다.");
        }

        return gameRepository.save(game);
    }

    // 경기 삭제
    public void deleteGame(Long gameId) {
        // 경기 ID로 게임을 찾기
        Optional<Game> existingGame = gameRepository.findGameByGameId(gameId);

        if (existingGame.isEmpty()) {
            throw new RuntimeException("경기를 찾을 수 없습니다.");
        }

        // 게임 삭제
        gameRepository.delete(existingGame.get()); // 게임 삭제
    }

    // 특정 팀에 속한 모든 게임 삭제
    public void deleteGamesByTeamId(Long teamId) {
        Team team = teamRepository.findTeamByTeamId(teamId)
                        .orElseThrow(() -> new RuntimeException("팀을 찾을 수 없습니다."));
        gameRepository.deleteByTeam(team);
    }

    // 경기 업데이트
    public Game updateGame(Game game) {
        Optional<Game> existingGame = gameRepository.findGameByGameId(game.getGameId());

        // isEmpty()를 사용하여 값이 없는 경우 처리
        if (existingGame.isEmpty()) {
            throw new RuntimeException("경기를 찾을 수 없습니다.");
        }

        return gameRepository.save(game);
    }

    // 경기 조회
    public Optional<Game> getGameByGameId(Long gameId) {
        Optional<Game> existingGame = gameRepository.findGameByGameId(gameId);

        // isEmpty()를 사용하여 값이 없는 경우 처리
        if (existingGame.isEmpty()) {
            throw new RuntimeException("경기를 찾을 수 없습니다.");
        }

        return existingGame;
    }

    // 경기에 참여하는 인원 추가
    public void insertUserToGame(Long gameId, String userMail) {

        // 게임이 존재하는지 확인
        Optional<Game> existingGame = gameRepository.findGameByGameId(gameId);
        Optional<User> existingUser = userRepository.findUserByUserMail(userMail);

        if (existingGame.isEmpty()) {
            throw new RuntimeException("경기가 존재하지 않습니다."); // 경기가 없으면 예외 처리
        } if (existingUser.isEmpty()) {
            throw new RuntimeException("사용자가 존재하지 않습니다.");
        }

        Game game = existingGame.get(); // 존재하는 경기를 가져옴
        User user = existingUser.get();

        // 경기 참가 선수 목록에 해당 사용자가 이미 존재하는지 확인
        if (game.getPlayers().contains(user)) {
            throw new RuntimeException("이 사용자는 이미 경기에 참여하고 있습니다."); // 이미 참여한 경우 예외 처리
        }

        // 사용자 추가
        game.getPlayers().add(user); // 경기 참가 선수 목록에 사용자를 추가

        // 게임 정보 업데이트 (저장)
        gameRepository.save(game); // 경기 정보 업데이트
    }

    // 경기에 참여하는 선수 삭제
    public void removeUserFromGame(Long gameId, String userMail) {

        // 게임이 존재하는지 확인
        Optional<Game> existingGame = gameRepository.findGameByGameId(gameId);
        Optional<User> existingUser = userRepository.findUserByUserMail(userMail);

        if (existingGame.isEmpty()) {
            throw new RuntimeException("경기가 존재하지 않습니다.");
        }
        if (existingUser.isEmpty()) {
            throw new RuntimeException("사용자가 존재하지 않습니다.");
        }

        Game game = existingGame.get();
        User user = existingUser.get();

        // 경기 참가 선수 목록에서 해당 사용자가 있는지 확인
        if (!game.getPlayers().contains(user)) {
            throw new RuntimeException("이 사용자는 해당 경기에서 찾을 수 없습니다.");
        }

        // 사용자 삭제
        game.getPlayers().remove(user); // 경기 참가 선수 목록에서 해당 사용자 제거

        // 게임 정보 업데이트 (저장)
        gameRepository.save(game); // 경기 정보 업데이트
    }
}