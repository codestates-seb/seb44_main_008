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

import com.codestates.user.entity.User;
import com.codestates.user.service.UserService;

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
    private final UserService userService;
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public ReviewBoardController(ReviewBoardService reviewBoardService, ReviewBoardMapper mapper, UserService userService, CommentService commentService, CommentMapper commentMapper) {
        this.reviewBoardService = reviewBoardService;
        this.mapper = mapper;
        this.userService = userService;
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PostMapping("/{user-id}")
    public ResponseEntity postReviewBoard(@PathVariable("user-id") @Positive long userId,
                                          @Valid @RequestBody ReviewBoardDto.Post post) {
        User user = userService.findUser(userId);
        ReviewBoard reviewBoard = reviewBoardService.createReviewBoard(user, mapper.PostToReviewBoard(post));
        URI location = UriComponent.createUri(REVIEW_BOARD_DEFAULT_URI, reviewBoard.getReviewBoardId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{review-id}/users/{user-id}")
    public ResponseEntity patchReviewBoard(@PathVariable("user-id") @Positive long userId,
                                           @PathVariable("review-id") @Positive long reviewId,
                                           @Valid @RequestBody ReviewBoardDto.Patch patch) {
        User user = userService.findUser(userId);
        patch.setReviewBoardId(reviewId);
        ReviewBoard reviewBoard = reviewBoardService.updateReviewBoard(user, mapper.PatchToReviewBoard(patch));
        ReviewBoardDto.Response response = mapper.reviewBoardToResponse(reviewBoard);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{review-id}/users/{user-id}")
    public ResponseEntity getReviewBoard(@PathVariable("user-id") @Positive long userId,
                                         @PathVariable("review-id") @Positive long reviewId) {
        User user = userService.findUser(userId);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(user, reviewId);
//        return new ResponseEntity<>(mapper.reviewBoardToResponse(reviewBoard), HttpStatus.OK);
        return new ResponseEntity<>(mapper.reviewBoardToDetailResponse(reviewBoard, commentMapper), HttpStatus.OK);
    }

    @GetMapping("/users/{user-id}")
    public ResponseEntity getAllReviewBoards(@PathVariable("user-id") @Positive long userId,
                                             @Positive @RequestParam int page,
                                             @Positive @RequestParam int size) {
        User user = userService.findUser(userId);
        Page<ReviewBoard> pageReviewBoards = reviewBoardService.findAllReviewBoards(user, page - 1, size);
        List<ReviewBoard> reviewBoards = pageReviewBoards.getContent();

        return new ResponseEntity<>(new ResponseDto.MultipleResponseDto<>(mapper.reviewBoardsToResponses(reviewBoards), pageReviewBoards), HttpStatus.OK);
    }

    @DeleteMapping("/{review-id}/users/{user-id}")
    public ResponseEntity deleteReviewBoard(@PathVariable("user-id") @Positive long userId,
                                            @PathVariable("review-id") @Positive long reviewId) {
        User user = userService.findUser(userId);
        reviewBoardService.deleteReviewBoard(user,reviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/main/users/{user-id}")
    public ResponseEntity getMainReviewBoards(@PathVariable("user-id") @Positive long userId) {
        User user = userService.findUser(userId);
        List<ReviewBoard> reviewBoards = reviewBoardService.findReviewBoards(user);
        List<ReviewBoard> popularBoards = reviewBoardService.findPopularReviewBoards(user);

        return new ResponseEntity(
                new ResponseDto.SingleResponseDto<>(mapper.reviewBoardsToDetailResponses(reviewBoards, popularBoards)),
                HttpStatus.OK
        );
    }

    @PostMapping("/{review-id}/users/{user-id}/comments")
    public ResponseEntity postComment(@PathVariable("review-id") @Positive long reviewId,
                                      @PathVariable("user-id") @Positive long userId,
                                      @RequestBody @Valid CommentDto.Post requestBody) {
        User user = userService.findUser(userId);
        Comment comment = commentService.createComment(reviewId, user, commentMapper.commentPostDtoToComment(requestBody));
        URI location = UriComponent.createUri(COMMENT_DEFAULT_URL, comment.getCommentId());

        return ResponseEntity.created(location).build();
    }
}
