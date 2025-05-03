package com.ce.back.repository;

import com.ce.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);  // 사용자 이름이 존재하는지 확인
    Optional<User> findByUsernameAndPassword(String username, String password); // 로그인 시 사용되는 메서드
    Optional<User> findByUsername(String username);  // 사용자 이름으로 검색
}