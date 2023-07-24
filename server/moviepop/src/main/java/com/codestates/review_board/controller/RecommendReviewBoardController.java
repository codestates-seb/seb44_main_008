package com.codestates.review_board.controller;

import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.service.RecommendReviewBoardService;
import com.codestates.review_board.service.ReviewBoardService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RecommendReviewBoardController {
    private final RecommendReviewBoardService recommendReviewBoardService;
    private final ReviewBoardService reviewBoardService;

    public RecommendReviewBoardController(RecommendReviewBoardService recommendReviewBoardService, ReviewBoardService reviewBoardService) {
        this.recommendReviewBoardService = recommendReviewBoardService;
        this.reviewBoardService = reviewBoardService;
    }

    @Scheduled(cron = "0 59 22 * * *", zone = "Asia/Seoul")
    public void calculateScore() {
        List<ReviewBoard> reviewBoardList = reviewBoardService.findAllReviewBoardsAsList();
        recommendReviewBoardService.calculateTop300(reviewBoardList);
    }
}
