package com.codestates.user.repository;

import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewBoardWishRepository extends JpaRepository<ReviewBoardWish, Long> {
    ReviewBoardWish findByReviewBoardIdAndUserId(long reviewBoardId, long userId);
    boolean existsByReviewBoardAndUser(ReviewBoard reviewBoard, User user);
}
