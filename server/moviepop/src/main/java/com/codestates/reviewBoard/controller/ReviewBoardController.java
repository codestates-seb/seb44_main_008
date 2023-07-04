package com.codestates.reviewBoard.controller;

import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.entity.Comment;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.comment.service.CommentService;
import com.codestates.dto.ResponseDto;
import com.codestates.reviewBoard.dto.ReviewBoardDto;
import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.reviewBoard.mapper.ReviewBoardMapper;
import com.codestates.reviewBoard.service.ReviewBoardService;
import com.codestates.utils.UriComponent;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

import static com.codestates.comment.controller.CommentController.COMMENT_DEFAULT_URL;

@RequestMapping("/reviewBoards")
@RestController
@Validated
public class ReviewBoardController {
    private final static String REVIEW_BOARD_DEFAULT_URI = "/reviewBoards";
    private final ReviewBoardService reviewBoardService;
    private final ReviewBoardMapper mapper;
    private final CommentService commentService;
    private final CommentMapper commentMapper;

//    public ReviewBoardController(ReviewBoardService reviewBoardService, ReviewBoardMapper mapper) {
//        this.reviewBoardService = reviewBoardService;
//        this.mapper = mapper;
//    }


    public ReviewBoardController(ReviewBoardService reviewBoardService, ReviewBoardMapper mapper, CommentService commentService, CommentMapper commentMapper) {
        this.reviewBoardService = reviewBoardService;
        this.mapper = mapper;
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PostMapping
    public ResponseEntity postReviewBoard(@Valid @RequestBody ReviewBoardDto.Post post) {
        ReviewBoard reviewBoard = reviewBoardService.createReviewBoard(mapper.PostToReviewBoard(post));
        URI location = UriComponent.createUri(REVIEW_BOARD_DEFAULT_URI, reviewBoard.getReviewBoardId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{review-id}")
    public ResponseEntity patchReviewBoard(@PathVariable("review-id") @Positive long reviewId,
                                           @Valid @RequestBody ReviewBoardDto.Patch patch) {
        patch.setReviewBoardId(reviewId);
        ReviewBoard reviewBoard = reviewBoardService.updateReviewBoard(mapper.PatchToReviewBoard(patch));
        ReviewBoardDto.Response response = mapper.reviewBoardToResponse(reviewBoard);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{review-id}")
    public ResponseEntity getReviewBoard(@PathVariable("review-id") @Positive long reviewId) {
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(reviewId);
//        return new ResponseEntity<>(mapper.reviewBoardToResponse(reviewBoard), HttpStatus.OK);
        return new ResponseEntity<>(mapper.reviewBoardToDetailResponse(reviewBoard, commentMapper), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllReviewBoards(@Positive @RequestParam int page,
                                             @Positive @RequestParam int size) {
        Page<ReviewBoard> pageReviewBoards = reviewBoardService.findReviewBoards(page - 1, size);
        List<ReviewBoard> reviewBoards = pageReviewBoards.getContent();

//        return new ResponseEntity<>(new ResponseDto.MultipleResponseDto<>(mapper.reviewBoardsToResponses(reviewBoards), pageReviewBoards), HttpStatus.OK);
        return new ResponseEntity<>(new ResponseDto.MultipleResponseDto<>(mapper.reviewBoardsToEntireResponses(reviewBoards), pageReviewBoards), HttpStatus.OK);
    }

    @GetMapping("/main")
    public ResponseEntity getMainReviewBoards() {
        List<ReviewBoard> reviewBoards = reviewBoardService.findReviewBoards();
        List<ReviewBoard> popularBoards = reviewBoardService.findPopularReviewBoards();

        return new ResponseEntity(
                new ResponseDto.SingleResponseDto<>(mapper.reviewBoardsToDetailResponses(reviewBoards, popularBoards)),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReviewBoard(@PathVariable("review-id") @Positive long reviewId) {
        reviewBoardService.deleteReviewBoard(reviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{review-id}/comments")
    public ResponseEntity postComment(@PathVariable("review-id") @Positive long reviewId,
                                      @RequestBody @Valid CommentDto.Post requestBody) {

        Comment comment = commentService.createComment(reviewId, commentMapper.commentPostDtoToComment(requestBody));
        URI location = UriComponent.createUri(COMMENT_DEFAULT_URL, comment.getCommentId());

        return ResponseEntity.created(location).build();
    }
}
