package com.codestates.reviewBoard.service;


import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.reviewBoard.entity.ReviewBoardTag;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.repository.TagRepository;
import com.codestates.tag.service.TagService;
import com.codestates.user.entity.User;

import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.reviewBoard.repository.ReviewBoardRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReviewBoardService {

    private final ReviewBoardRepository reviewBoardRepository;
    private final TagService tagService;

//    public ReviewBoardService(ReviewBoardRepository reviewBoardRepository) {
//        this.reviewBoardRepository = reviewBoardRepository;
//    }

    public ReviewBoardService(ReviewBoardRepository reviewBoardRepository, TagService tagService) {
        this.reviewBoardRepository = reviewBoardRepository;
        this.tagService = tagService;
    }

    public ReviewBoard createReviewBoard(User user, ReviewBoard reviewBoard) {
        // reviewBoardTag.getTag() -> 이 Tag는 tagId 밖에 없었음
        // 저 tagId를 가지고 실제 정보인 Tag 객체를 가져옴(DB에서)
        // reviewBoardTag 안에 있는 Tag 객체를 실제 정보로 변경해주자!
        for(ReviewBoardTag reviewBoardTag : reviewBoard.getReviewBoardTags()) {
            Tag tag = tagService.findTag(reviewBoardTag.getTag().getTagId());
            reviewBoardTag.setTag(tag);
            reviewBoardTag.setReviewBoard(reviewBoard);
        }

        user.addReviewBoard(reviewBoard);

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

    public Page<ReviewBoard> findAllReviewBoards(int page, int size) {
        return reviewBoardRepository.findAll(PageRequest.of(page,size,
                Sort.by("reviewBoardId").descending()));
    }

    public void deleteReviewBoard(long userId, long reviewId) {
        ReviewBoard reviewBoard = findReviewBoard(reviewId);
        if(reviewBoard.getUser().getUserId() != userId)
            throw new BusinessLogicException(ExceptionCode.CANNOT_UPDATE_REVIEW_BOARD);

        reviewBoardRepository.delete(reviewBoard);
    }

    public List<ReviewBoard> findReviewBoards() {
        return reviewBoardRepository.findTop12ByOrderByReviewBoardIdDesc();
    }

    public List<ReviewBoard> findPopularReviewBoards() {
        return reviewBoardRepository.findTop8ByOrderByWishDesc();
    }

    @Transactional(readOnly = true)
    public ReviewBoard findReviewBoardById(long reviewId) {
        Optional<ReviewBoard> optionalReviewBoard = reviewBoardRepository.findById(reviewId);
        ReviewBoard findReviewBoard =
                optionalReviewBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_BOARD_NOT_FOUND));
        return findReviewBoard;
    }
}
