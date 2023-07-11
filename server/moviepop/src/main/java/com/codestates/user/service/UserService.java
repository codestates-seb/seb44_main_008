package com.codestates.user.service;

import com.codestates.comment.entity.Comment;
import com.codestates.comment.service.CommentService;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.movie_party.entity.MovieParty;
import com.codestates.movie_party.service.MoviePartyService;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.service.ReviewBoardService;
import com.codestates.security.entity.Authority;
import com.codestates.security.jwt.JwtTokenizer;
import com.codestates.security.redis.CacheKey;
import com.codestates.security.redis.repository.LogoutAccessTokenRedisRepository;
import com.codestates.security.redis.repository.RefreshTokenRedisRepository;
import com.codestates.security.redis.token.LogoutAccessToken;
import com.codestates.security.redis.token.RefreshToken;
import com.codestates.security.utils.CustomAuthorityUtils;
import com.codestates.security.vo.Login;
import com.codestates.security.vo.Token;
import com.codestates.user.entity.CommentLike;
import com.codestates.user.entity.MoviePartyUser;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.entity.User;
import com.codestates.user.entity.UserTag;
import com.codestates.user.repository.MoviePartyUserRepository;
import com.codestates.user.repository.UserRepository;
import com.codestates.utils.CustomBeanUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static com.codestates.security.utils.JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME;

@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final CustomBeanUtils<User> beanUtils;
    private final ReviewBoardWishService reviewBoardWishService;
    private final ReviewBoardService reviewBoardService;
    private final CommentService commentService;
    private final CommentLikeService commentLikeService;
    private final MoviePartyService moviePartyService;
    private final MoviePartyUserRepository moviePartyUserRepository;
    private final JwtTokenizer jwtTokenizer;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final CustomAuthorityUtils authorityUtils;

//    public UserService(UserRepository userRepository, CustomBeanUtils<User> beanUtils,
//                       ReviewBoardWishService reviewBoardWishService, ReviewBoardService reviewBoardService, CommentService commentService, CommentLikeService commentLikeService) {
//        this.userRepository = userRepository;
//        this.beanUtils = beanUtils;
//        this.reviewBoardWishService = reviewBoardWishService;
//        this.reviewBoardService = reviewBoardService;
//        this.commentService = commentService;
//        this.commentLikeService = commentLikeService;
//    }

    public UserService(UserRepository userRepository, CustomBeanUtils<User> beanUtils, ReviewBoardWishService reviewBoardWishService, ReviewBoardService reviewBoardService, CommentService commentService, CommentLikeService commentLikeService, MoviePartyService moviePartyService, MoviePartyUserRepository moviePartyUserRepository, JwtTokenizer jwtTokenizer, PasswordEncoder passwordEncoder, RefreshTokenRedisRepository refreshTokenRedisRepository, LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository, CustomAuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.beanUtils = beanUtils;
        this.reviewBoardWishService = reviewBoardWishService;
        this.reviewBoardService = reviewBoardService;
        this.commentService = commentService;
        this.commentLikeService = commentLikeService;
        this.moviePartyService = moviePartyService;
        this.moviePartyUserRepository = moviePartyUserRepository;
        this.jwtTokenizer = jwtTokenizer;
        this.passwordEncoder = passwordEncoder;
        this.refreshTokenRedisRepository = refreshTokenRedisRepository;
        this.logoutAccessTokenRedisRepository = logoutAccessTokenRedisRepository;
        this.authorityUtils = authorityUtils;
    }

    public User createUser(User user) {
        if(!verifyEmail(user))
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);

        //UserTag에 user를 넣어줘야한다.
        for(UserTag userTag : user.getUserTags()){
            userTag.setUser(user);
        }

        //비밀번호 암호화
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        //권한 부여
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        Set<Authority> authorities = roles.stream()
                .map(role -> Authority.builder()
                        .role("ROLE_" + role)
                        .user(user)
                        .build())
                .collect(Collectors.toSet());
        user.setAuthorities(authorities);

        return userRepository.save(user);
    }

    private boolean verifyEmail(User user) {
        if(userRepository.findByEmail(user.getEmail()) == null)
            return true;
        return false;
    }

    public User updateUser(User user) {
        User findUser = findUser(user.getUserId());
        Optional.ofNullable(user.getNickname())
                .ifPresent(nickname -> findUser.setNickname(nickname));
        findUser.getUserTags().clear();

        findUser.getUserTags().addAll(user.getUserTags());

        for(UserTag userTag : findUser.getUserTags()) {
            userTag.setUser(findUser);
        }

        findUser.setProfileImage(user.getProfileImage());

        return userRepository.save(findUser);
    }

    public User updateUserPassword(long userId, String currentPassword, String newPassword) {
        User findUser = verifyUserId(userId);
        if(!findUser.getPassword().equals(currentPassword))
            throw new BusinessLogicException(ExceptionCode.PASSWORD_INCORRECT);

        findUser.setPassword(newPassword);
        return userRepository.save(findUser);
    }

    @Transactional(readOnly = true)
    public User findUser(long userId) {
        return verifyUserId(userId);
    }

    public void deleteUser(long userId) {
        User findUser = verifyUserId(userId);
        findUser.setUserStatus(User.UserStatus.USER_WITHDRAW);
    }

    private User verifyUserId(long userId) {
        return userRepository.findById(userId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public Map<String, String> login(Login login) {
        User user = userRepository.findByEmail(login.getEmail());
        if(user.getUserStatus().equals(User.UserStatus.USER_WITHDRAW))
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        checkPassword(login.getPassword(), user.getPassword());

        String username = user.getEmail();
        String accessToken = jwtTokenizer.generateAccessToken(username);
        RefreshToken refreshToken = saveRefreshToken(username);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("Authorization", accessToken);
        tokens.put("Refresh", refreshToken.getRefreshToken());

        return tokens;
    }

    private void checkPassword(String password, String registeredPassword) {
        if(!passwordEncoder.matches(password, registeredPassword))
            throw new BusinessLogicException(ExceptionCode.PASSWORD_INCORRECT);
    }

    private RefreshToken saveRefreshToken(String username) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(
                username,
                jwtTokenizer.generateRefreshToken(username),
                REFRESH_TOKEN_EXPIRATION_TIME.getValue()
        ));
    }

    @CacheEvict(value = CacheKey.USER, key = "#username")
    public void logout(Token token, String username) {
        String accessToken = resolveToken(token.getAccessToken());
        long remainMilliSeconds = jwtTokenizer.getRemainMilliSeconds(accessToken);
        refreshTokenRedisRepository.deleteById(username);
        logoutAccessTokenRedisRepository.save(LogoutAccessToken.of(accessToken, username, remainMilliSeconds));
    }

    private String resolveToken(String token) {
        return token.substring(7);
    }

    public void createReviewBoardWish(long userId, long reviewBoardId) {
        User user = findUser(userId);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(user, reviewBoardId);

        if(reviewBoardWishService.isExistReviewBoardWish(reviewBoard, user))
            throw new BusinessLogicException(ExceptionCode.ALREADY_WISH_EXIST);

        reviewBoard.setWish(reviewBoard.getWish() + 1);

        ReviewBoardWish reviewBoardWish = new ReviewBoardWish();
        reviewBoardWish.setUser(user);
        reviewBoardWish.setReviewBoard(reviewBoard);

        user.addReviewBoardWish(reviewBoardWish);

        userRepository.save(user);
    }

    public void deleteReviewBoardWish(long userId, long reviewBoardId) {
        User user = findUser(userId);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(user, reviewBoardId);

        ReviewBoardWish reviewBoardWish = reviewBoardWishService.findReviewBoardAndUser(reviewBoard, user);
        if(reviewBoardWish == null)
            throw new BusinessLogicException(ExceptionCode.WISH_NOT_FOUND);

        reviewBoard.setWish(reviewBoard.getWish() - 1);
        user.deleteReviewBoardWish(reviewBoardWish);
//        reviewBoardWishService.deleteReviewBoardWish(reviewBoardWish.getReviewBoardWishId());

        userRepository.save(user);
    }

    public Comment createCommentLike(long userId, long commentId) {
        User user = findUser(userId);
        Comment comment = commentService.findComment(commentId);

        if(commentLikeService.existsByCommentAndUser(comment,user))
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKE_EXIST);

        comment.setLikes(comment.getLikes() + 1);

        CommentLike commentLike = new CommentLike();
        commentLike.setUser(user);
        commentLike.setComment(comment);

        user.addCommentLike(commentLike);

        userRepository.save(user);

        return comment;
    }

    public Comment deleteCommentLike(long userId, long commentId) {
        User user = findUser(userId);
        Comment comment = commentService.findComment(commentId);

        CommentLike commentLike = commentLikeService.findByCommentAndUser(comment, user);
        if(commentLike == null)
            throw new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND);

        comment.setLikes(comment.getLikes() - 1);

        user.deleteCommentLike(commentLike);

        return comment;
    }

    public MovieParty createUserParticipation(long userId, long groupId) {
        User user = findUser(userId);
        MovieParty movieParty = moviePartyService.findMovieParty(groupId, user);

        if(movieParty.getUser().getUserId() == userId)
            throw new BusinessLogicException(ExceptionCode.CANNOT_PARTICIPATE_WRITER);
        if(movieParty.getMaxCapacity() <= movieParty.getCurrentParticipant())
            throw new BusinessLogicException(ExceptionCode.OVER_MAX_PARTICIPANT);

        MoviePartyUser moviePartyUser = new MoviePartyUser();
        moviePartyUser.setMovieParty(movieParty);
        moviePartyUser.setUser(user);
        moviePartyUser.setProfileImage(user.getProfileImage());

        if(user.getMoviePartyUsers().contains(moviePartyUser))
            throw new BusinessLogicException(ExceptionCode.CANNOT_PARTICIPATE_MOVIE_PARTY);

        user.addMoviePartyUser(moviePartyUser);

        movieParty.setCurrentParticipant(movieParty.getCurrentParticipant() + 1);

        userRepository.save(user);

        return movieParty;
    }

    public MovieParty deleteUserParticipation(long userId, long groupId) {
        User user = findUser(userId);
        MovieParty movieParty = moviePartyService.findMovieParty(groupId, user);

        if(movieParty.getUser().getUserId() == userId)
            throw new BusinessLogicException(ExceptionCode.CANNOT_CANCEL_WRITER);
        if(!moviePartyUserRepository.existsByUserAndMovieParty(user, movieParty))
            throw new BusinessLogicException(ExceptionCode.CANNOT_CANCEL_MOVIE_PARTY);

        MoviePartyUser moviePartyUser = new MoviePartyUser();
        moviePartyUser.setMovieParty(movieParty);
        moviePartyUser.setUser(user);

        user.getMoviePartyUsers().remove(moviePartyUser);

        movieParty.setCurrentParticipant(movieParty.getCurrentParticipant() - 1);

        userRepository.save(user);

        return movieParty;
    }
}