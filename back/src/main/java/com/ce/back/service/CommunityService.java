package com.ce.back.service;

import com.ce.back.entity.Community;
import com.ce.back.entity.Team;
import com.ce.back.entity.User;
import com.ce.back.repository.CommunityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;

    // 게시글 작성
    public Community createPost(String title, String content, Long teamId, String userMail, String category) {
        Community post = Community.builder()
                .title(title)
                .content(content)
                .createTime(LocalDateTime.now())
                .views(0)
                .team(Team.builder().teamId(teamId).build())
                .user(User.builder().userMail(userMail).build())
                .category(category)
                .build();
        return communityRepository.save(post);
    }

    // 게시글 단건 조회 + 조회수 증가
    @Transactional
    public Community getPostWithViews(Long contentId) {
        communityRepository.incrementViews(contentId);
        return communityRepository.findById(contentId)
                .orElseThrow(() -> new RuntimeException("해당 게시물이 없습니다."));
    }

    // 전체 게시글 조회
    public List<Community> getAllPosts() {
        return communityRepository.findAll();
    }

    // 카테고리로 조회
    public List<Community> getPostsByCategory(String category) {
        return communityRepository.findByCategory(category);
    }

    // 제목 키워드 검색
    public List<Community> searchByTitle(String keyword) {
        return communityRepository.findByTitleContaining(keyword);
    }

    // 팀 ID 기반 조회
    public List<Community> getPostsByTeamId(Long teamId) {
        return communityRepository.findByTeam_TeamId(teamId);
    }

    // 사용자 이메일 기반 조회
    public List<Community> getPostsByUserMail(String userMail) {
        return communityRepository.findByUser_UserMail(userMail);
    }

    // 게시글 삭제
    public void deletePost(Long contentId) {
        communityRepository.deleteById(contentId);
    }

    // 게시글 수정
    public Community updatePost(Long contentId, String title, String content) {
        Community post = communityRepository.findById(contentId)
                .orElseThrow(() -> new RuntimeException("해당 게시물이 없습니다."));

        if (title != null) post.setTitle(title);
        if (content != null) post.setContent(content);
        return communityRepository.save(post);
    }
}