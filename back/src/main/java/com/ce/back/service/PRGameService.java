package com.ce.back.service;

import com.ce.back.entity.PRGame;
import com.ce.back.entity.Game;
import com.ce.back.repository.GameRepository;
import com.ce.back.repository.PRGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PRGameService {

    private final PRGameRepository prGameRepository;

    @Autowired
    public PRGameService(PRGameRepository prGameRepository) {
        this.prGameRepository = prGameRepository;
    }

    // PRGame 생성
    public PRGame save(PRGame prGame) {
        return prGameRepository.save(prGame);
    }

    // userMail로 PRGame 찾기
    public List<PRGame> findByUserMail(String userMail) {
        return prGameRepository.findByUserMail(userMail);
    }

    // gameId로 PRGame 찾기
    public List<PRGame> findByGameId(Long gameId) {
        return prGameRepository.findByGameId(gameId);
    }

    // PRGame 수정
    public PRGame update(PRGame prGame) {
        return prGameRepository.save(prGame);
    }

    // prGameId로 PRGame 찾기
    public Optional<PRGame> getPRGameById(Long prGameId) {
        return prGameRepository.findById(prGameId);
    }

    // PRGame 삭제
    public void delete(PRGame prGame) {
        prGameRepository.delete(prGame);
    }

    // Game과 관련된 PRGame들 모두 삭제
    public void deletePRGamesByGameId(Long gameId) {
        Game game = Game.builder().gameId(gameId).build();
        prGameRepository.deleteByGame(game);
    }
}