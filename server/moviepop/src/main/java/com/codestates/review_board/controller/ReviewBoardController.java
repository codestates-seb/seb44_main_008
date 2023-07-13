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

import com.codestates.security.interceptor.JwtParseInterceptor;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.tag.service.TagService;
import com.codestates.user.entity.User;
import com.codestates.user.mapper.UserMapper;
import com.codestates.user.service.ReviewBoardWishService;
import com.codestates.user.service.UserService;

import com.codestates.user.service.UserTagService;
import com.codestates.utils.UriComponent;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final ReviewBoardWishService reviewBoardWishService;
    private final UserTagService userTagService;

    public ReviewBoardController(ReviewBoardService reviewBoardService, ReviewBoardMapper mapper, UserService userService, UserMapper userMapper, CommentService commentService, CommentMapper commentMapper, TagMapper tagMapper, TagService tagService, MoviePartyService moviePartyService, MoviePartyMapper moviePartyMapper, ReviewBoardWishService reviewBoardWishService, UserTagService userTagService) {
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
        this.reviewBoardWishService = reviewBoardWishService;
        this.userTagService = userTagService;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postReviewBoard(@Valid @RequestPart ReviewBoardDto.Post post,
                                          @RequestPart MultipartFile thumbnail) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        ReviewBoard reviewBoard = reviewBoardService.createReviewBoard(user, mapper.PostToReviewBoard(post, tagMapper), thumbnail);
        URI location = UriComponent.createUri(REVIEW_BOARD_DEFAULT_URI, reviewBoard.getReviewBoardId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping(value = "/{review-id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity patchReviewBoard(@PathVariable("review-id") @Positive long reviewId,
                                           @Valid @RequestPart ReviewBoardDto.Patch patch,
                                           @RequestPart MultipartFile thumbnail) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        patch.setReviewBoardId(reviewId);

        ReviewBoardDto.DetailResponse response = reviewBoardService.updateReviewBoard(user, mapper.PatchToReviewBoard(patch, tagMapper), thumbnail);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{review-id}")
        public ResponseEntity getReviewBoard(@PathVariable("review-id") @Positive long reviewId) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        ReviewBoardDto.DetailResponse response = reviewBoardService.findDetailReviewBoard(user, reviewId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllReviewBoards(@Positive @RequestParam int page,
                                             @Positive @RequestParam int size) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        Page<ReviewBoard> pageReviewBoards = reviewBoardService.findAllReviewBoards(user, page, size);
        List<ReviewBoard> reviewBoards = pageReviewBoards.getContent();

        return new ResponseEntity<>(new ResponseDto.MultipleResponseDto<>(mapper.reviewBoardsToEntireResponses(reviewBoards), pageReviewBoards), HttpStatus.OK);
    }

    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReviewBoard(@PathVariable("review-id") @Positive long reviewId) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        reviewBoardService.deleteReviewBoard(user,reviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/main")
    public ResponseEntity getMainReviewBoards() {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        List<Tag> tags = userTagService.findTagByUserTag(user.getUserTags());
        List<ReviewBoard> reviewBoards = reviewBoardService.findReviewBoards(user);
        List<ReviewBoard> popularBoards = reviewBoardService.findPopularReviewBoards(user);
        List<ReviewBoard> recommendBoards = reviewBoardService.findRecommendReviewBoards(user, tags);


        return new ResponseEntity(
                new ResponseDto.SingleResponseDto<>(mapper.reviewBoardsToDetailResponses(reviewBoards, popularBoards, recommendBoards)),
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
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        Tag tag = tagService.findTagById(tagId);
        Page<ReviewBoard> pageReviewBoards = reviewBoardService.findSpecificTagReviewBoards(user, tag, page, size);
        List<ReviewBoard> reviewBoards = pageReviewBoards.getContent();

        return new ResponseEntity<>(new ResponseDto.MultipleResponseDto<>(mapper.reviewBoardsToEntireResponses(reviewBoards), pageReviewBoards), HttpStatus.OK);
    }

    @PostMapping("/{review-id}/comments")
    public ResponseEntity postComment(@PathVariable("review-id") @Positive long reviewId,
                                      @RequestBody @Valid CommentDto.Post requestBody) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        Comment comment = commentService.createComment(reviewId, user, commentMapper.commentPostDtoToComment(requestBody));
        URI location = UriComponent.createUri(COMMENT_DEFAULT_URL, comment.getCommentId());

        return ResponseEntity.created(location).build();
    }

    @PostMapping("/{review-id}/groups")
    public ResponseEntity postMovieParty(@PathVariable("review-id") @Positive long reviewId,
                                         @RequestBody @Valid MoviePartyDto.Post requestBody) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        MovieParty movieParty = moviePartyService.createMovieParty(user, reviewBoardService.findReviewBoard(user, reviewId), moviePartyMapper.moviePartyPostDtoToMovieParty(requestBody));

        URI location = UriComponent.createUri(MOVIE_PARTY_DEFAULT_URI, movieParty.getMoviePartyId());

        return ResponseEntity.created(location).build();
    }
}
