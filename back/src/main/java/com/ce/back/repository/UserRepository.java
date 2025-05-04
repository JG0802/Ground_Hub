package com.ce.back.repository;

import com.ce.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserMail(String userMail);  // 사용자 이메일이 존재하는지 확인
    Optional<User> findByUserMailAndPassword(String userMail, String password); // 로그인 시 사용되는 메서드
    Optional<User> findByUserName(String userName);  // 사용자 이름으로 검색
    Optional<User> findByUserMail(String userMail);
}