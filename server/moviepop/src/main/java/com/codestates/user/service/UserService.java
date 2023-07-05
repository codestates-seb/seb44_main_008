package com.codestates.user.service;

import com.codestates.comment.entity.Comment;
import com.codestates.comment.service.CommentService;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.reviewBoard.service.ReviewBoardService;
import com.codestates.user.entity.CommentLike;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.entity.User;
import com.codestates.user.repository.ReviewBoardWishRepository;
import com.codestates.user.repository.UserRepository;
import com.codestates.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

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
        User findUser = userRepository.findByEmail(user.getEmail());
        User.checkExistEmail(findUser);
        //비밀번호 암호화
        //권한 부여
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User findUser(long userId) {
        User findUser = userRepository.findById(userId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

    public User updateUser(User user) {
        User findUser = findUser(user.getUserId());
        User updateUser = findUser.changeUserInfo(user, beanUtils);

        return userRepository.save(updateUser);
    }

    public User updateUserPassword(long userId, String currentPassword, String newPassword) {
        User findUser = userRepository.findById(userId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        if(findUser.getPassword() != currentPassword)
            throw new BusinessLogicException(ExceptionCode.PASSWORD_INCORRECT);

        findUser.setPassword(newPassword);
        return userRepository.save(findUser);
    }

    public void deleteUser(long userId) {
        User findUser = userRepository.findById(userId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        findUser.setUserStatus(User.UserStatus.USER_WITHDRAW);
    }

    public void createReviewBoardWish(long userId, long reviewBoardId) {
        User user = findUser(userId);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(reviewBoardId);

        if(reviewBoardWishService.isExistReviewBoardWish(reviewBoard, user))
            throw new BusinessLogicException(ExceptionCode.ALREADY_WISH_EXIST);

        reviewBoard.setWish(reviewBoard.getWish() + 1);

        ReviewBoardWish reviewBoardWish = new ReviewBoardWish();
        reviewBoardWish.setUser(user);
        reviewBoardWish.setReviewBoard(reviewBoard);

        user.addReviewBoardWish(reviewBoardWish);
    }

    public void deleteReviewBoardWish(long userId, long reviewBoardId) {
        User user = findUser(userId);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(reviewBoardId);

        if(!reviewBoardWishService.isExistReviewBoardWish(reviewBoard, user))
            throw new BusinessLogicException(ExceptionCode.WISH_NOT_FOUND);

        reviewBoard.setWish(reviewBoard.getWish() - 1);

        ReviewBoardWish reviewBoardWish = reviewBoardWishService.findReviewBoardAndUser(reviewBoard, user);

        user.deleteReviewBoardWish(reviewBoardWish.getReviewBoardWishId());
    }

    public void createCommentLike(long userId, long commentId) {
        User user = findUser(userId);
        Comment comment = commentService.findComment(commentId);

        if(commentLikeService.existsByCommentAndUser(comment,user)) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKE_EXIST);
        }
        comment.setLikes(comment.getLikes() + 1);

        CommentLike commentLike = new CommentLike();
        commentLike.setUser(user);
        commentLike.setComment(comment);

        user.addCommentLike(commentLike);
    }

    public void deleteCommentLike(long userId, long commentId) {
        User user = findUser(userId);
        Comment comment = commentService.findComment(commentId);

        if(!commentLikeService.existsByCommentAndUser(comment, user)) {
            throw new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND);
        }
        comment.setLikes(comment.getLikes() - 1);

        CommentLike commentLike = commentLikeService.findByCommentAndUser(comment, user);

        user.deleteCommentLike(commentLike.getCommentLikeId());
    }
}