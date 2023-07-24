package com.codestates.review_board.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.entity.ReviewBoardScore;
import com.codestates.review_board.repository.ReviewBoardScoreRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ReviewBoardScoreService {
    private final ReviewBoardScoreRepository reviewBoardScoreRepository;

    public ReviewBoardScoreService(ReviewBoardScoreRepository reviewBoardScoreRepository) {
        this.reviewBoardScoreRepository = reviewBoardScoreRepository;
    }

    public ReviewBoardScore createReviewBoardScore(ReviewBoardScore reviewBoardScore) {
        return reviewBoardScoreRepository.save(reviewBoardScore);
    }

    public ReviewBoardScore updateReviewBoardService(ReviewBoardScore reviewBoardScore) {
        return reviewBoardScoreRepository.save(reviewBoardScore);
    }

    public ReviewBoardScore findReviewBoardScore(ReviewBoard reviewBoard) {
        return reviewBoardScoreRepository.findByReviewBoard(reviewBoard).orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_BOARD_SCORE_NOT_FOUND));
    }

    public List<ReviewBoardScore> findReviewBoardScores() {
        return reviewBoardScoreRepository.findAll();
    }
}
