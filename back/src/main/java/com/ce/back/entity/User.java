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
public class User {

    @Id
    private String userMail; // 사용자 이메일

    private String password; // 비밀번호
    private String userName; // 사용자 이름
    private String tel; // 전화번호

    private String firstPosition;
    private String secondPosition;
    private String thirdPosition;

    // 다대다 관계를 위한 매핑
    @ManyToMany(mappedBy = "users")
    private List<Team> teams; // 사용자가 속한 팀 목록
}