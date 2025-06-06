package com.ce.back.entity;

import lombok.*;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId; // 경기 고유 ID

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createTime;
    private int views = 0;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "user_mail")
    private User user;
}