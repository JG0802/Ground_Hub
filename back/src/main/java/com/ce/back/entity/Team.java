package com.ce.back.entity;

import lombok.*;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Team {

    @Id
    private String teamId; // 팀 고유 ID

    private String teamName; // 팀 이름
    private String location; // 팀 위치
    private String firstColor; // 팀 첫 번째 색상
    private String secondColor; // 팀 두 번째 색상

    @ManyToOne
    @JoinColumn(name = "team_manager_id")
    private User teamManager; // 팀 관리자 이름

    // 다대다 관계를 위한 매핑
    @ManyToMany
    @JoinTable(
            name = "team_user",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users; // 팀에 속한 사용자 목록

    // 1:N 관계 (팀과 경기)
    @OneToMany(mappedBy = "team")
    private List<Game> schedule; // 팀의 경기 일정
}