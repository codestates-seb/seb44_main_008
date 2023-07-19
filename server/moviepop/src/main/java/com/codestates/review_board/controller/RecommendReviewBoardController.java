package com.codestates.review_board.controller;

import com.codestates.review_board.service.RecommendReviewBoardService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class RecommendReviewBoardController {
    private final RecommendReviewBoardService recommendReviewBoardService;

    public RecommendReviewBoardController(RecommendReviewBoardService recommendReviewBoardService) {
        this.recommendReviewBoardService = recommendReviewBoardService;
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void calculateScore() {
        recommendReviewBoardService.calculateTop300();
    }
}
