package com.ce.back.repository;

import com.ce.back.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
    // JpaRepository가 기본적으로 제공하는 메서드들:
    // findById, findAll, save, delete 등
}