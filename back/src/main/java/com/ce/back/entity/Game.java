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
    private Long gameId; // 경기 고유 ID

    private String gameName; // 경기 이름
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

    // 각 포지션에 대한 사용자
    @ManyToOne
    @JoinColumn(name = "gk_id")
    private User gk; // 골키퍼

    @ManyToOne
    @JoinColumn(name = "lb_id")
    private User lb; // 왼쪽 풀백

    @ManyToOne
    @JoinColumn(name = "lcb_id")
    private User lcb; // 왼쪽 센터백

    @ManyToOne
    @JoinColumn(name = "sw_id")
    private User sw; // 스위퍼

    @ManyToOne
    @JoinColumn(name = "rcb_id")
    private User rcb; // 오른쪽 센터백

    @ManyToOne
    @JoinColumn(name = "rb_id")
    private User rb; // 오른쪽 풀백

    @ManyToOne
    @JoinColumn(name = "lwb_id")
    private User lwb; // 왼쪽 윙백

    @ManyToOne
    @JoinColumn(name = "ldm_id")
    private User ldm; // 왼쪽 수비형 미드필더

    @ManyToOne
    @JoinColumn(name = "cdm_id")
    private User cdm; // 중앙 수비형 미드필더

    @ManyToOne
    @JoinColumn(name = "rdm_id")
    private User rdm; // 오른쪽 수비형 미드필더

    @ManyToOne
    @JoinColumn(name = "rwb_id")
    private User rwb; // 오른쪽 윙백

    @ManyToOne
    @JoinColumn(name = "lm_id")
    private User lm; // 왼쪽 미드필더

    @ManyToOne
    @JoinColumn(name = "lcm_id")
    private User lcm; // 왼쪽 중앙 미드필더

    @ManyToOne
    @JoinColumn(name = "cm_id")
    private User cm; // 중앙 미드필더

    @ManyToOne
    @JoinColumn(name = "rcm_id")
    private User rcm; // 오른쪽 중앙 미드필더

    @ManyToOne
    @JoinColumn(name = "rm_id")
    private User rm; // 오른쪽 미드필더

    @ManyToOne
    @JoinColumn(name = "lam_id")
    private User lam; // 왼쪽 공격형 미드필더

    @ManyToOne
    @JoinColumn(name = "cam_id")
    private User cam; // 중앙 공격형 미드필더

    @ManyToOne
    @JoinColumn(name = "ram_id")
    private User ram; // 오른쪽 공격형 미드필더

    @ManyToOne
    @JoinColumn(name = "lw_id")
    private User lw; // 왼쪽 윙어

    @ManyToOne
    @JoinColumn(name = "cf_id")
    private User cf; // 중앙 포워드

    @ManyToOne
    @JoinColumn(name = "rw_id")
    private User rw; // 오른쪽 윙어

    @ManyToOne
    @JoinColumn(name = "ls_id")
    private User ls; // 왼쪽 스트라이커

    @ManyToOne
    @JoinColumn(name = "rs_id")
    private User rs; // 오른쪽 스트라이커

    @ManyToOne
    @JoinColumn(name = "st_id")
    private User st; // 스트라이커
}