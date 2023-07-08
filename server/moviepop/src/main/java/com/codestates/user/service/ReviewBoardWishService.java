package com.codestates.user.service;

import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.entity.User;
import com.codestates.user.repository.ReviewBoardWishRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public class ReviewBoardWishService {
    private final ReviewBoardWishRepository reviewBoardWishRepository;

    public ReviewBoardWishService(ReviewBoardWishRepository reviewBoardWishRepository) {
        this.reviewBoardWishRepository = reviewBoardWishRepository;
    }

    public boolean isExistReviewBoardWish(ReviewBoard reviewBoard, User user) {
        return reviewBoardWishRepository.existsByReviewBoardAndUser(reviewBoard, user);
    }

    public ReviewBoardWish findReviewBoardAndUser(ReviewBoard reviewBoard, User user) {
        return reviewBoardWishRepository.findByReviewBoardAndUser(reviewBoard, user);
    }

    public void deleteReviewBoardWish(long reviewBoardWishId) {
        reviewBoardWishRepository.deleteById(reviewBoardWishId);
    }
}