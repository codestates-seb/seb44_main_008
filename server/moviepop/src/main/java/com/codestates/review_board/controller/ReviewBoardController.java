package com.codestates.review_board.controller;


import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.entity.Comment;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.comment.service.CommentService;
import com.codestates.dto.ResponseDto;
import com.codestates.movie_party.dto.MoviePartyDto;
import com.codestates.movie_party.entity.MovieParty;
import com.codestates.movie_party.mapper.MoviePartyMapper;
import com.codestates.movie_party.service.MoviePartyService;
import com.codestates.review_board.dto.ReviewBoardDto;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.mapper.ReviewBoardMapper;
import com.codestates.review_board.service.ReviewBoardService;

import com.codestates.tag.entity.Tag;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.tag.service.TagService;
import com.codestates.user.entity.User;
import com.codestates.user.mapper.UserMapper;
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
import static com.codestates.movie_party.controller.MoviePartyController.MOVIE_PARTY_DEFAULT_URI;

@RequestMapping("/reviewBoards")
@RestController
@Validated
public class ReviewBoardController {

    private final static String REVIEW_BOARD_DEFAULT_URI = "/reviewBoards";
    private final ReviewBoardService reviewBoardService;
    private final ReviewBoardMapper mapper;
    private final UserService userService;
    private final UserMapper userMapper;
    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final TagMapper tagMapper;
    private final TagService tagService;
    private final MoviePartyService moviePartyService;
    private final MoviePartyMapper moviePartyMapper;


//    public ReviewBoardController(ReviewBoardService reviewBoardService, ReviewBoardMapper mapper, UserService userService, CommentService commentService, CommentMapper commentMapper) {
//        this.reviewBoardService = reviewBoardService;
//        this.mapper = mapper;
//        this.userService = userService;
//        this.commentService = commentService;
//        this.commentMapper = commentMapper;
//    }

    public ReviewBoardController(ReviewBoardService reviewBoardService, ReviewBoardMapper mapper, UserService userService, UserMapper userMapper, CommentService commentService, CommentMapper commentMapper, TagMapper tagMapper, TagService tagService, MoviePartyService moviePartyService, MoviePartyMapper moviePartyMapper) {
        this.reviewBoardService = reviewBoardService;
        this.mapper = mapper;
        this.userService = userService;
        this.userMapper = userMapper;
        this.commentService = commentService;
        this.commentMapper = commentMapper;
        this.tagMapper = tagMapper;
        this.tagService = tagService;
        this.moviePartyService = moviePartyService;
        this.moviePartyMapper = moviePartyMapper;
    }

    @PostMapping("/{user-id}")
    public ResponseEntity postReviewBoard(@PathVariable("user-id") @Positive long userId,
                                          @Valid @RequestBody ReviewBoardDto.Post post) {
        User user = userService.findUser(userId);
        ReviewBoard reviewBoard = reviewBoardService.createReviewBoard(user, mapper.PostToReviewBoard(post, tagMapper));
        URI location = UriComponent.createUri(REVIEW_BOARD_DEFAULT_URI, reviewBoard.getReviewBoardId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{review-id}/users/{user-id}")
    public ResponseEntity patchReviewBoard(@PathVariable("user-id") @Positive long userId,
                                           @PathVariable("review-id") @Positive long reviewId,
                                           @Valid @RequestBody ReviewBoardDto.Patch patch) {

        User user = userService.findUser(userId);
        patch.setReviewBoardId(reviewId);
        ReviewBoard reviewBoard = reviewBoardService.updateReviewBoard(user, mapper.PatchToReviewBoard(patch, tagMapper));
        ReviewBoardDto.DetailResponse response = mapper.reviewBoardToDetailResponse(reviewBoard, commentMapper, tagMapper, moviePartyMapper, userMapper);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{review-id}/users/{user-id}")
    public ResponseEntity getReviewBoard(@PathVariable("user-id") @Positive long userId,
                                         @PathVariable("review-id") @Positive long reviewId) {
        User user = userService.findUser(userId);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(user, reviewId);
//        return new ResponseEntity<>(mapper.reviewBoardToResponse(reviewBoard), HttpStatus.OK);

        return new ResponseEntity<>(mapper.reviewBoardToDetailResponse(reviewBoard, commentMapper, tagMapper, moviePartyMapper, userMapper), HttpStatus.OK);
    }

    @GetMapping("/users/{user-id}")
    public ResponseEntity getAllReviewBoards(@PathVariable("user-id") @Positive long userId,
                                             @Positive @RequestParam int page,
                                             @Positive @RequestParam int size) {
        User user = userService.findUser(userId);
        Page<ReviewBoard> pageReviewBoards = reviewBoardService.findAllReviewBoards(user, page, size);
        List<ReviewBoard> reviewBoards = pageReviewBoards.getContent();

        return new ResponseEntity<>(new ResponseDto.MultipleResponseDto<>(mapper.reviewBoardsToEntireResponses(reviewBoards), pageReviewBoards), HttpStatus.OK);
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

    @GetMapping("/search")
    public ResponseEntity searchReviewBoards(@RequestParam("q") String title,
                                             @Positive @RequestParam int page,
                                             @Positive @RequestParam int size) {
        Page<ReviewBoard> pageReviewBoards = reviewBoardService.findSearchedReviewBoards(title, page, size);
        List<ReviewBoard> reviewBoards = pageReviewBoards.getContent();
        System.out.println("reviewBoards = " + reviewBoards);
        return new ResponseEntity<>(new ResponseDto.MultipleResponseDto<>(mapper.reviewBoardsToEntireResponses(reviewBoards), pageReviewBoards), HttpStatus.OK);
    }


    @GetMapping("/tags/{tag-id}")
    public ResponseEntity getSpecificTag(@PathVariable("tag-id") @Positive long tagId,
                                         @Positive @RequestParam int page,
                                         @Positive @RequestParam int size) {
        Tag tag = tagService.findTagById(tagId);
        Page<ReviewBoard> pageReviewBoards = reviewBoardService.findSpecificTagReviewBoards(tag,page, size);
        List<ReviewBoard> reviewBoards = pageReviewBoards.getContent();

        return new ResponseEntity<>(new ResponseDto.MultipleResponseDto<>(mapper.reviewBoardsToEntireResponses(reviewBoards), pageReviewBoards), HttpStatus.OK);
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

    @PostMapping("/{review-id}/groups/users/{user-id}")
    public ResponseEntity postMovieParty(@PathVariable("review-id") @Positive long reviewId,
                                         @PathVariable("user-id") @Positive long userId,
                                         @RequestBody @Valid MoviePartyDto.Post requestBody) {
        User user = userService.findUser(userId);
        MovieParty movieParty = moviePartyService.createMovieParty(user, reviewBoardService.findReviewBoard(user, reviewId), moviePartyMapper.moviePartyPostDtoToMovieParty(requestBody));

        URI location = UriComponent.createUri(MOVIE_PARTY_DEFAULT_URI, movieParty.getMoviePartyId());

        return ResponseEntity.created(location).build();
    }
}