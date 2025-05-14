package com.ce.back.dummy;

import com.ce.back.entity.Game;
import com.ce.back.entity.Team;
import com.ce.back.entity.User;
import com.ce.back.repository.GameRepository;
import com.ce.back.repository.TeamRepository;
import com.ce.back.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final GameRepository matchRepository;

    public DataInitializer(UserRepository userRepository, TeamRepository teamRepository,
            GameRepository matchRepository) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // 더미 사용자 생성
        User user1 = User.builder()
                .userMail("ysy@naver.com")
                .password("qwer1234")
                .userName("윤석열")
                .tel("010-1234-5678")
                .firstPosition("GK")
                .secondPosition("CB")
                .thirdPosition("LB")
                .build();

        User user2 = User.builder()
                .userMail("mji@naver.com")
                .password("qwer1234")
                .userName("문재인")
                .tel("010-2345-6789")
                .firstPosition("ST")
                .secondPosition("CF")
                .thirdPosition("RM")
                .build();

        User user3 = User.builder()
                .userMail("pgh@naver.com")
                .password("qwer1234")
                .userName("박근혜")
                .tel("010-2345-6789")
                .firstPosition("CDM")
                .secondPosition("CM")
                .thirdPosition("CAM")
                .build();

        // 유저 저장 (중복 데이터 확인 후 삽입)
        saveUserIfNotExists(user1);
        saveUserIfNotExists(user2);
        saveUserIfNotExists(user3);

        // 더미 팀 생성
        Team team1 = Team.builder()
                .teamName("불도저")
                .location("용인")
                .firstColor("red")
                .secondColor("black")
                .teamManager(user1) // 팀 관리자를 유저1로 설정
                .users(Arrays.asList(user1, user2, user3)) // 유저를 팀에 포함
                .build();

        // 팀 저장 (중복 데이터 확인 후 삽입)
        saveTeamIfNotExists(team1);

        // 더미 경기 생성
        Game match1 = Game.builder()
                .gameName("불도저 1쿼터")
                .date(LocalDateTime.of(2025, 5, 10, 14, 0))
                .versus("test")
                .team(team1) // 불도저 팀
                .players(Arrays.asList(user1, user2, user3)) // 경기에 참여할 유저들
                .build();

        // 더미 경기 생성
        Game match2 = Game.builder()
                .gameName("불도저 2쿼터")
                .date(LocalDateTime.of(2025, 5, 10, 14, 30))
                .versus("test")
                .team(team1) // 불도저 팀
                .players(Arrays.asList(user1, user2, user3)) // 경기에 참여할 유저들
                .build();

        // 경기 저장 (중복 데이터 확인 후 삽입)
        saveGameIfNotExists(match1);
        saveGameIfNotExists(match2);

        System.out.println("더미 데이터가 성공적으로 생성되었습니다.");
    }

    // 유저가 중복되지 않으면 저장
    private void saveUserIfNotExists(User user) {
        Optional<User> existingUser = userRepository.findUserByUserMail(user.getUserMail());
        if (existingUser.isEmpty()) {
            userRepository.save(user);
        }
    }

    // 팀이 중복되지 않으면 저장
    private void saveTeamIfNotExists(Team team) {
        Optional<Team> existingTeam = teamRepository.findTeamByTeamId(team.getTeamId());
        if (existingTeam.isEmpty()) {
            teamRepository.save(team);
        }
    }

    // 경기가 중복되지 않으면 저장
    private void saveGameIfNotExists(Game game) {
        Optional<Game> existingGame = matchRepository.findGameByGameId(game.getGameId());
        if (existingGame.isEmpty()) {
            matchRepository.save(game);
        }
    }
}