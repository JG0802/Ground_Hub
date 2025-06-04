package com.ce.back.repository;

import com.ce.back.entity.Game;
import com.ce.back.entity.PRGame;
import com.ce.back.entity.User;
import com.ce.back.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PRGameRepository extends JpaRepository<PRGame, Long> {

    // PRGame 엔티티를 Game으로 조회
    List<PRGame> findByGameId(Long gameId);

    // PRGame 엔티티를 User로 모두 조회
    List<PRGame> findByUserMail(String userMail);

    // Game과 User로 PRGame 조회
    Optional<PRGame> findByGameAndUser(Game game, com.ce.back.entity.User user);

    // Game으로 PRGame 삭제
    void deleteByGame(Game game);
}