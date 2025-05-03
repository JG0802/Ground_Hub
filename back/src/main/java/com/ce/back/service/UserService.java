package com.ce.back.service;

import com.ce.back.entity.User;
import com.ce.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 사용자 등록
    public boolean registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return false; // 이미 존재하는 사용자
        }
        userRepository.save(user);
        return true;
    }

    // 로그인
    public Optional<User> loginUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    // 사용자 정보 수정
    public boolean updateUser(User user) {
        if (userRepository.existsById(Long.valueOf(user.getUserid()))) {
            userRepository.save(user);
            return true;
        }
        return false; // 사용자 없음
    }

    // 포지션 수정
    public boolean updateUserPositions(String username, List<String> positions) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFirst_position(positions.get(0));
            user.setSecond_position(positions.get(1));
            user.setThird_position(positions.get(2));
            userRepository.save(user);
            return true;
        }
        return false; // 사용자 없음
    }

    // 비밀번호 변경
    public boolean changePassword(String username, String newPassword) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(newPassword);
            userRepository.save(user);
            return true;
        }
        return false; // 사용자 없음
    }
}