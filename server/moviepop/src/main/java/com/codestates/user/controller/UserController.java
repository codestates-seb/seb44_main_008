package com.codestates.user.controller;


import com.codestates.comment.entity.Comment;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.comment.service.CommentService;
import com.codestates.dto.ResponseDto;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.mapper.ReviewBoardMapper;
import com.codestates.review_board.service.ReviewBoardService;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.tag.service.TagService;
import com.codestates.user.dto.UserDto;
import com.codestates.user.entity.User;
import com.codestates.user.mapper.UserMapper;
import com.codestates.user.service.CommentLikeService;
import com.codestates.user.service.ReviewBoardWishService;
import com.codestates.user.service.UserService;
import com.codestates.utils.UriComponent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/users")
@Validated
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final static String USER_DEFAULT_URI = "/users";
    private final UserService userService;
    private final ReviewBoardService reviewBoardService;
    private final UserMapper userMapper;
    private final ReviewBoardMapper reviewBoardMapper;
    private final CommentMapper commentMapper;
    private final TagMapper tagMapper;
    private final TagService tagService;
    private final CommentLikeService commentLikeService;
    private final ReviewBoardWishService reviewBoardWishService;

//    private final JwtTokenizer jwtTokenizer;

    @PostMapping // 회원가입
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post userPostDto) {
        User user = userMapper.userPostDtoToUser(userPostDto, tagMapper);
        User createUser = userService.createUser(user);

        URI uri = UriComponent.createUri(USER_DEFAULT_URI, createUser.getUserId());

        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{user-id}") // 회원정보 수정 -> jwt적용하지 않았을 경우 userId가 필요해보임
    public ResponseEntity patchUser(@PathVariable ("user-id") @Positive long userId,
                                    @Valid @RequestBody UserDto.Patch userPatchDto) {
        userPatchDto.setUserId(userId);
        User user = userService.updateUser(userMapper.userPatchDtoToUser(userPatchDto, tagMapper));

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(userMapper.userToUserPatchDto(user, tagMapper)),
                HttpStatus.OK
        );
    }

    @PatchMapping("/{user-id}/password") // 비밀번호 수정
    public ResponseEntity patchUserPassword(@PathVariable("user-id") @Positive long userId,
                                            @Valid @RequestBody UserDto.PatchPassword userPatchPasswordDto) {
        User user = userService.updateUserPassword(userId, userPatchPasswordDto.getCurrentPassword(), userPatchPasswordDto.getNewPassword());

        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @GetMapping // 자신의 회원정보 조회
//    public ResponseEntity getUser() {
//        //로그인된 사용자 정보를 가져와야 가능해보임
//        return new ResponseEntity(
//                new ResponseDto.SingleResponseDto<>(userMapper.userToUserResponseDto(토큰정보)),
//                HttpStatus.OK
//        );
//    }

    @GetMapping("/{user-id}") // 특정 회원정보 조회
    public ResponseEntity getOtherUser(@PathVariable("user-id") @Positive long userId) {
        User user = userService.findUser(userId);

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(userMapper.userToUserResponseDto(user,reviewBoardMapper,tagMapper)),
                HttpStatus.OK
        );
    }

    @GetMapping("{user-id}/brief") // 회원정보 수정 페이지
    public ResponseEntity getUserBrief(@PathVariable("user-id") @Positive long userId) {
        User user = userService.findUser(userId);
        List<TagDto.Response> tags = tagMapper.tagsToResponses(tagService.getTags());

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(userMapper.userToUserPatchPageResponse(user, tagMapper, tags)),
                HttpStatus.OK
        );
    }

//    @GetMapping("/brief") // 간략한 회원 정보 조회
//    public ResponseEntity getUserBrief() {
//        //로그인된 사용자 정보를 가져와야 가능해보임
//        return new ResponseEntity<>(
//                new ResponseDto.SingleResponseDto<>(userMapper.userToUserBriefResponseDto(토큰정보)),
//                HttpStatus.OK
//        );
//    }

    @DeleteMapping("/{user-id}") // 회원 삭제
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{user-id}/reviewBoards/{review-id}") // 게시글 찜 등록
    public ResponseEntity postUserWish(@PathVariable("user-id") @Positive long userId,
                                       @PathVariable("review-id") @Positive long reviewId) {
        User user = userService.findUser(userId);
        userService.createReviewBoardWish(user, reviewId);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(user, reviewId);
        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(reviewBoardMapper.reviewBoardToWishResponse(reviewBoard)),
                HttpStatus.OK
        );
    }

    @DeleteMapping("{user-id}/reviewBoards/{review-id}") // 게시글 찜 해제
    public ResponseEntity deleteReviewWish(@PathVariable("user-id") @Positive long userId,
                                           @PathVariable("review-id") @Positive long reviewId) {
        userService.deleteReviewBoardWish(userId, reviewId);
        User user = userService.findUser(userId);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(user, reviewId);
        return new ResponseEntity<>(new ResponseDto.SingleResponseDto<>(reviewBoardMapper.reviewBoardToWishResponse(reviewBoard)),
                HttpStatus.OK);
    }

    @PostMapping("/{user-id}/comments/{comment-id}") //댓글 좋아요
    public ResponseEntity postCommentLike(@PathVariable("user-id") @Positive long userId,
                                          @PathVariable("comment-id") @Positive long commentId) {
        Comment comment = userService.createCommentLike(userId, commentId);

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(commentMapper.commentToCommentLikeResponse(comment)),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{user-id}/comments/{comment-id}") //댓글 좋아요 해제
    public ResponseEntity deleteCommentLike(@PathVariable("user-id") @Positive long userId,
                                            @PathVariable("comment-id") @Positive long commentId) {
        Comment comment = userService.deleteCommentLike(userId, commentId);

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(commentMapper.commentToCommentLikeResponse(comment)),
                HttpStatus.NO_CONTENT
        );
    }

    @PostMapping("/groups/{group-id}") // 팟 참여 기능
    public ResponseEntity postUserParticipation() {
        return null;
    }

    @DeleteMapping("/groups/{group-id}") // 팟 참여 취소
    public ResponseEntity deleteParticipatedGroup() {
        return null;
    }
}