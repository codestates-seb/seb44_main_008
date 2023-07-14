package com.codestates.user.controller;


import com.codestates.comment.entity.Comment;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.comment.service.CommentService;
import com.codestates.dto.ResponseDto;
import com.codestates.image.utils.ImageUtil;
import com.codestates.movie_party.entity.MovieParty;
import com.codestates.movie_party.mapper.MoviePartyMapper;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.mapper.ReviewBoardMapper;
import com.codestates.review_board.service.ReviewBoardService;
import com.codestates.security.interceptor.JwtParseInterceptor;
import com.codestates.security.jwt.JwtTokenizer;
import com.codestates.security.vo.Login;
import com.codestates.security.vo.Token;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.tag.service.TagService;
import com.codestates.user.dto.UserDto;
import com.codestates.user.entity.MoviePartyUser;
import com.codestates.user.entity.User;
import com.codestates.user.mapper.UserMapper;
import com.codestates.user.service.CommentLikeService;
import com.codestates.user.service.ReviewBoardWishService;
import com.codestates.user.service.UserService;
import com.codestates.utils.UriComponent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Map;

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
    private final MoviePartyMapper moviePartyMapper;
    private final JwtTokenizer jwtTokenizer;
    private final ImageUtil imageUtil;
//    private final CommentLikeService commentLikeService;
//    private final ReviewBoardWishService reviewBoardWishService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}) // 회원가입
    public ResponseEntity postUser(@Valid @RequestPart UserDto.Post userPostDto,
                                   @RequestPart MultipartFile profileImage) {
        User user = userMapper.userPostDtoToUser(userPostDto, tagMapper);
        User createUser = userService.createUser(user, profileImage);

        URI uri = UriComponent.createUri(USER_DEFAULT_URI, createUser.getUserId());

        return ResponseEntity.created(uri).build();
    }

    @PatchMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}) // 회원정보 수정 -> jwt적용하지 않았을 경우 userId가 필요해보임
    public ResponseEntity patchUser(@Valid @RequestPart UserDto.Patch userPatchDto,
                                    @RequestPart MultipartFile profileImage) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        userPatchDto.setEmail(email);
        User user = userService.updateUser(userMapper.userPatchDtoToUser(userPatchDto, tagMapper), profileImage);

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(userMapper.userToUserPatchDto(user, tagMapper, imageUtil)),
                HttpStatus.OK
        );
    }

    @PatchMapping("/password") // 비밀번호 수정
    public ResponseEntity patchUserPassword(@Valid @RequestBody UserDto.PatchPassword userPatchPasswordDto) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.updateUserPassword(email, userPatchPasswordDto.getCurrentPassword(), userPatchPasswordDto.getNewPassword());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping // 자신의 회원정보 조회
    public ResponseEntity getUser() {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);

        return new ResponseEntity(
                new ResponseDto.SingleResponseDto<>(userMapper.userToUserResponseDto(user, reviewBoardMapper, tagMapper, moviePartyMapper, userMapper, imageUtil)),
                HttpStatus.OK
        );
    }

    @GetMapping("/{user-id}") // 특정 회원정보 조회
    public ResponseEntity getOtherUser(@PathVariable("user-id") @Positive long userId) {
        User user = userService.findUser(userId);

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(userMapper.userToUserResponseDto(user,reviewBoardMapper,tagMapper, moviePartyMapper, userMapper, imageUtil)),
                HttpStatus.OK
        );
    }

    @GetMapping("/brief") // 회원정보 수정 페이지
    public ResponseEntity getUserBrief() {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        List<TagDto.Response> tags = tagMapper.tagsToResponses(tagService.getTags());

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(userMapper.userToUserPatchPageResponse(user, tagMapper, tags, imageUtil)),
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

    @DeleteMapping // 회원 삭제
    public ResponseEntity deleteUser() {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        userService.deleteUser(email);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid Login login, HttpServletResponse response) {
        Map<String, String> tokens = userService.login(login);
        response.setHeader("Authorization", "Bearer " + tokens.get("Authorization"));
        response.setHeader("Refresh", "Bearer " + tokens.get("Refresh"));

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") String accessToken,
                                 @RequestHeader("Refresh") String refreshToken) {
        String username = jwtTokenizer.getUsername(resolveToken(accessToken));
        userService.logout(new Token(accessToken, refreshToken), username);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(@RequestHeader("Refresh") String refreshToken, HttpServletResponse response) {
        Map<String, String> tokens = userService.reissue(refreshToken);

        response.setHeader("Authorization", tokens.get("Authorization"));
        response.setHeader("Refresh", tokens.get("Refresh"));

        return new ResponseEntity(HttpStatus.OK);
    }

    private String resolveToken(String accessToken) {
        return accessToken.substring(7);
    }

    @PostMapping("/reviewBoards/{review-id}") // 게시글 찜 등록
    public ResponseEntity postUserWish(@PathVariable("review-id") @Positive long reviewId) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        userService.createReviewBoardWish(email, reviewId);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(userService.findVerifiedUserByEmail(email), reviewId);

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(reviewBoardMapper.reviewBoardToWishResponse(reviewBoard)),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/reviewBoards/{review-id}") // 게시글 찜 해제
    public ResponseEntity deleteReviewWish(@PathVariable("review-id") @Positive long reviewId) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        userService.deleteReviewBoardWish(email, reviewId);

        User user = userService.findVerifiedUserByEmail(email);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(user, reviewId);
        return new ResponseEntity<>(new ResponseDto.SingleResponseDto<>(reviewBoardMapper.reviewBoardToWishResponse(reviewBoard)),
                HttpStatus.OK);
    }

    @PostMapping("/comments/{comment-id}") //댓글 좋아요
    public ResponseEntity postCommentLike(@PathVariable("comment-id") @Positive long commentId) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        Comment comment = userService.createCommentLike(email, commentId);

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(commentMapper.commentToCommentLikeResponse(comment)),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/comments/{comment-id}") //댓글 좋아요 해제
    public ResponseEntity deleteCommentLike(@PathVariable("comment-id") @Positive long commentId) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        Comment comment = userService.deleteCommentLike(email, commentId);

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(commentMapper.commentToCommentLikeResponse(comment)),
                HttpStatus.OK
        );
    }

    @PostMapping("/groups/{group-id}") // 팟 참여 기능
    public ResponseEntity postUserParticipation(@PathVariable("group-id") @Positive long groupId) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        MovieParty movieParty = userService.createUserParticipation(email, groupId);

        return new ResponseEntity(
                new ResponseDto.SingleResponseDto<>(moviePartyMapper.moviePartyToCurrentParticipantResponse(movieParty)),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/groups/{group-id}") // 팟 참여 취소
    public ResponseEntity deleteParticipatedGroup(@PathVariable("group-id") @Positive long groupId) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        MovieParty movieParty = userService.deleteUserParticipation(email, groupId);

        return new ResponseEntity(
                new ResponseDto.SingleResponseDto<>(moviePartyMapper.moviePartyToCurrentParticipantResponse(movieParty)),
                HttpStatus.OK
        );
    }
}