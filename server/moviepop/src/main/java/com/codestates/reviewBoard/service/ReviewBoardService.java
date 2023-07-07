package com.codestates.reviewBoard.service;


import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.reviewBoard.entity.ReviewBoardTag;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.service.TagService;
import com.codestates.user.entity.User;

import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.reviewBoard.repository.ReviewBoardRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
//        for(ReviewBoardTag reviewBoardTag : reviewBoard.getReviewBoardTags()) {
//            Tag tag = tagService.findTagById(reviewBoardTag.getTag().getTagId());
//            reviewBoardTag.setTag(tag);
//            reviewBoardTag.setReviewBoard(reviewBoard);
//        }
//
//        user.addReviewBoard(reviewBoard);
//
//        reviewBoard.setUser(user);
        //2가지 방법
        //1. 위처럼reviewboardtag안에 tag를 가져와서 실제 객체로 만들고 반환한다.
        //2. 그냥 그 과정없이 아이디값만 가져온것을 바로 적용한다
        for(ReviewBoardTag reviewBoardTag : reviewBoard.getReviewBoardTags()) {
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

        for(ReviewBoardTag reviewBoardTag : reviewBoard.getReviewBoardTags()) {
            Tag tag = tagService.findTagById(reviewBoardTag.getTag().getTagId());
            reviewBoardTag.setTag(tag);
            reviewBoardTag.setReviewBoard(getReviewboard);
        }

        List<ReviewBoardTag> newTags = reviewBoard.getReviewBoardTags();
        getReviewboard.getReviewBoardTags().clear();
        getReviewboard.getReviewBoardTags().addAll(newTags);

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

    public Page<ReviewBoard> findSpecificTagReviewBoards(Tag tag, int page, int size) {
        return reviewBoardRepository.findByReviewBoardTagsTag(tag,PageRequest.of(page,size,
                Sort.by("reviewBoardId").descending()));
    }

    @Transactional(readOnly = true)
    public ReviewBoard findReviewBoardById(long reviewId) {
        Optional<ReviewBoard> optionalReviewBoard = reviewBoardRepository.findById(reviewId);
        ReviewBoard findReviewBoard =
                optionalReviewBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_BOARD_NOT_FOUND));
        return findReviewBoard;
    }
}
