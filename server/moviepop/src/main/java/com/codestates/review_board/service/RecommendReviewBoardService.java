package com.codestates.review_board.service;

import com.codestates.review_board.entity.RecommendReviewBoard;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.entity.ReviewBoardScore;
import com.codestates.review_board.repository.RecommendReviewBoardRepository;
import com.codestates.user.entity.User;
import com.codestates.utils.UserUtils;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RecommendReviewBoardService {
    private final RecommendReviewBoardRepository recommendReviewBoardRepository;
    private final ReviewBoardService reviewBoardService;
    private final ReviewBoardScoreService reviewBoardScoreService;

    public RecommendReviewBoardService(RecommendReviewBoardRepository recommendReviewBoardRepository, ReviewBoardService reviewBoardService, ReviewBoardScoreService reviewBoardScoreService) {
        this.recommendReviewBoardRepository = recommendReviewBoardRepository;
        this.reviewBoardService = reviewBoardService;
        this.reviewBoardScoreService = reviewBoardScoreService;
    }

    public void calculateTop300() {
        recommendReviewBoardRepository.deleteAll();

        // 전체 ReviewBoard 얻어오기
        List<ReviewBoard> reviewBoardList = reviewBoardService.findAllReviewBoardsAsList();
        // 점수 계산
        List<RecommendReviewBoard> recommendReviewBoards = reviewBoardList.stream()
                .map(reviewBoard -> {
                    RecommendReviewBoard recommendReviewBoard = new RecommendReviewBoard();
                    recommendReviewBoard.setReviewBoard(reviewBoard);
                    recommendReviewBoard.setAge(UserUtils.getAge(reviewBoard.getUser()).getYears());
                    recommendReviewBoard.setScore(calculateScore(reviewBoard));

                    return recommendReviewBoard;
                })
                .collect(Collectors.toList());
        // 점수 높은 순으로 정렬
        Collections.sort(recommendReviewBoards, new Comparator<RecommendReviewBoard>() {
            @Override
            public int compare(RecommendReviewBoard o1, RecommendReviewBoard o2) {
                return o2.getScore() - o1.getScore();
            }
        });
        // 300개 끊음
        List<RecommendReviewBoard> top300 = recommendReviewBoards.subList(0, Math.min(300, recommendReviewBoards.size()));

        recommendReviewBoardRepository.saveAll(top300);
    }

    public int calculateScore(ReviewBoard reviewBoard) {
        // 로그 테이블 -> reviewBoard, 인원수, 영화 팟 개수
        // -> reviewBoard : 객체가 아니라 id가 들어감 -> reviewBoard 접근 필요(select문)
        ReviewBoardScore reviewBoardScore = reviewBoardScoreService.findReviewBoardScore(reviewBoard);

        int moviePartyScore = reviewBoardScore.getUserCnt() * (int)(Math.round((double)reviewBoardScore.getUserCnt() / reviewBoardScore.getMoviePartyCnt())) + reviewBoardScore.getMoviePartyCnt();
        moviePartyScore *= 4;

        int wishScore = reviewBoard.getWish();
        int commentScore = reviewBoard.getComments().size();

        return moviePartyScore + wishScore + commentScore;
    }

    public List<RecommendReviewBoard> findRecommendReviewBoards() {
        return recommendReviewBoardRepository.findAll();
    }

    public List<RecommendReviewBoard> findTop5MyReviewBoards(User user) { //내가 작성한 리뷰게시글 작성기준 top5
        return recommendReviewBoardRepository.findTop5ByReviewBoardUserOrderByCreatedAtDesc(user);
    }

    public List<RecommendReviewBoard> findRecommendReviewBoardsByAge(int startAge, int endAge) {
        return recommendReviewBoardRepository.findByAgeBetween(startAge, endAge);
    }

    public List<RecommendReviewBoard> findRecommendReviewBoardsByAge(int age) {
        return recommendReviewBoardRepository.findByAgeGreaterThan(age);
    }
}
