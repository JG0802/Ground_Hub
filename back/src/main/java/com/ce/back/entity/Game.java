package com.ce.back.entity;

import lombok.*;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameid; // 경기 고유 ID

    private String gamename; // 경기 이름
    private LocalDateTime date; // 경기 일시
    private String versus; // 상대 팀

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team; // 해당 팀

    @ManyToMany
    @JoinTable(
            name = "game_player",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> players; // 경기 참가 선수들

    // 포지션 정보 (선수 이름을 저장하는 String 필드)
    private String gk;
    private String lb;
    private String lcb;
    private String sw;
    private String rcb;
    private String rb;
    private String lwb;
    private String ldm;
    private String cdm;
    private String rdm;
    private String rwb;
    private String lm;
    private String lcm;
    private String cm;
    private String rcm;
    private String rm;
    private String lam;
    private String cam;
    private String ram;
    private String lw;
    private String cf;
    private String rw;
    private String ls;
    private String rs;
    private String st;
}