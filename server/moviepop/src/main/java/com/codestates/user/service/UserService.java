package com.codestates.user.service;

import com.codestates.comment.entity.Comment;
import com.codestates.comment.service.CommentService;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.service.ReviewBoardService;
import com.codestates.user.entity.CommentLike;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.entity.User;

import com.codestates.user.entity.UserTag;
import com.codestates.user.repository.UserRepository;
import com.codestates.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final CustomBeanUtils<User> beanUtils;
    private final ReviewBoardWishService reviewBoardWishService;
    private final ReviewBoardService reviewBoardService;
    private final CommentService commentService;
    private final CommentLikeService commentLikeService;

    public UserService(UserRepository userRepository, CustomBeanUtils<User> beanUtils,
                       ReviewBoardWishService reviewBoardWishService, ReviewBoardService reviewBoardService, CommentService commentService, CommentLikeService commentLikeService) {
        this.userRepository = userRepository;
        this.beanUtils = beanUtils;
        this.reviewBoardWishService = reviewBoardWishService;
        this.reviewBoardService = reviewBoardService;
        this.commentService = commentService;
        this.commentLikeService = commentLikeService;
    }

    public User createUser(User user) {
        if(!verifyEmail(user))
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);

        //UserTag에 user를 넣어줘야한다.
        for(UserTag userTag : user.getUserTags()){
            userTag.setUser(user);
        }
        //비밀번호 암호화
        //권한 부여
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

    public void createReviewBoardWish(User user, long reviewBoardId) {
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
}