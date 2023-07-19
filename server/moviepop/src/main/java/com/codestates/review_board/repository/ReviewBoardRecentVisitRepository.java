package com.codestates.review_board.repository;

import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.entity.ReviewBoardRecentVisit;
import com.codestates.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReviewBoardRecentVisitRepository extends JpaRepository<ReviewBoardRecentVisit, Long> {
    ReviewBoardRecentVisit findByUserAndReviewBoard(User user, ReviewBoard reviewBoard);
    LocalDateTime findFirstByUserOrderByVisitedAtAsc(User user); // 필드 기반 첫번째 값 + Asc(오름차순 정렬)
    ReviewBoardRecentVisit findByUserAndVisitedAt(User user, LocalDateTime visitedAt);
    List<ReviewBoardRecentVisit> findByUser(User user);
}
