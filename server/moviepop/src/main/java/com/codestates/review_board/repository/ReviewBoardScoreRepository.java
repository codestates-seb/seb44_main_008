package com.codestates.review_board.repository;

import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.entity.ReviewBoardScore;
import com.codestates.review_board.service.ReviewBoardService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewBoardScoreRepository extends JpaRepository<ReviewBoardScore, Long> {
    Optional<ReviewBoardScore> findByReviewBoard(ReviewBoard reviewBoard);
}
