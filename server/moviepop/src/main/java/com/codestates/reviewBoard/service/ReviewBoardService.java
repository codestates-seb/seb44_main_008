package com.codestates.reviewBoard.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.reviewBoard.repository.ReviewBoardRepository;
import com.codestates.user.entity.User;
import com.codestates.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReviewBoardService {

    private final ReviewBoardRepository reviewBoardRepository;
    private final UserService userService;

    public ReviewBoardService(ReviewBoardRepository reviewBoardRepository, UserService userService) {
        this.reviewBoardRepository = reviewBoardRepository;
        this.userService = userService;
    }

    public ReviewBoard createReviewBoard(long userId, ReviewBoard reviewBoard) {
        User user = userService.findUser(userId);

        reviewBoard.setUser(user);

        return reviewBoardRepository.save(reviewBoard);
    }

    public ReviewBoard updateReviewBoard(long userId, ReviewBoard reviewBoard) {
        ReviewBoard getReviewboard = findReviewBoard(reviewBoard.getReviewBoardId());
        if(getReviewboard.getUser().getUserId() != userId)
            throw new BusinessLogicException(ExceptionCode.INVALID_USER);

        Optional.ofNullable(reviewBoard.getTitle())
                .ifPresent(title -> getReviewboard.setTitle(title));
        Optional.ofNullable(reviewBoard.getReview())
                .ifPresent(review -> getReviewboard.setReview(review));

        //영화제목, 태그, 썸네일 설정해야함.

        return reviewBoardRepository.save(getReviewboard);
    }

    public ReviewBoard findReviewBoard(long reviewId) {
        return findReviewBoardById(reviewId);
    }

    public Page<ReviewBoard> findReviewBoards(int page, int size) {
        return reviewBoardRepository.findAll(PageRequest.of(page,size,
                Sort.by("reviewId").descending()));
    }

    public void deleteReviewBoard(long reviewId) {
        ReviewBoard reviewBoard = findReviewBoardById(reviewId);
        reviewBoardRepository.delete(reviewBoard);
    }

    @Transactional(readOnly = true)
    public ReviewBoard findReviewBoardById(long reviewId) {
        Optional<ReviewBoard> optionalReviewBoard = reviewBoardRepository.findById(reviewId);
        ReviewBoard findReviewBoard =
                optionalReviewBoard.orElseThrow(() -> new IllegalArgumentException());
        return findReviewBoard;
    }
}
