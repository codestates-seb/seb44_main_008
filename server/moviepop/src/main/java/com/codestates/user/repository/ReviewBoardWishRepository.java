package com.codestates.user.repository;

import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReviewBoardWishRepository extends JpaRepository<ReviewBoardWish, Long> {
    ReviewBoardWish findByReviewBoardAndUser(ReviewBoard reviewBoard, User user);
    boolean existsByReviewBoardAndUser(ReviewBoard reviewBoard, User user);
}
