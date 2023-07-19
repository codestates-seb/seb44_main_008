package com.codestates.review_board.repository;

import com.codestates.review_board.entity.RecommendReviewBoard;
import com.codestates.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendReviewBoardRepository extends JpaRepository<RecommendReviewBoard, Long> {
    List<RecommendReviewBoard> findByAgeBetween(int startAge, int endAge);
    List<RecommendReviewBoard> findByAgeGreaterThan(int age);
    List<RecommendReviewBoard> findTop5ByReviewBoardUserOrderByCreatedAtDesc(User user);
}
