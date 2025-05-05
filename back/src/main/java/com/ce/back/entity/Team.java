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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId; // 팀 고유 ID (순서대로 자동생성)

    private String teamName; // 팀 이름
    private String location; // 팀 활동 지역
    private String firstColor; // 팀 홈 컬러
    private String secondColor; // 팀 원정 컬러

    @ManyToOne // 각 팀에 하나의 관리자만
    @JoinColumn(name = "team_manager_id")
    private User teamManager; // 팀 관리자 이름

    // 다대다 관계를 위한 매핑
    @ManyToMany // 팀에 여러 유저 참가 가능 / 각 사용자 또한 여러 팀에 속함
    @JoinTable(
            name = "team_user",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users; // 팀에 속한 사용자 목록

    // 1:N 관계 (팀과 경기)
    @OneToMany(mappedBy = "team") // 한 팀에 여러 경기 가능
    private List<Game> schedule; // 팀의 경기 일정
}