package com.codestates.user.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.reviewBoard.service.ReviewBoardService;
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
    private final ReviewBoardWishRepository reviewBoardWishRepository;
    private final CustomBeanUtils<User> beanUtils;
    private final ReviewBoardWishService reviewBoardWishService;
    private final ReviewBoardService reviewBoardService;

    public UserService(UserRepository userRepository, ReviewBoardWishRepository reviewBoardWishRepository, CustomBeanUtils<User> beanUtils, ReviewBoardWishService reviewBoardWishService, ReviewBoardService reviewBoardService) {
        this.userRepository = userRepository;
        this.reviewBoardWishRepository = reviewBoardWishRepository;
        this.beanUtils = beanUtils;
        this.reviewBoardWishService = reviewBoardWishService;
        this.reviewBoardService = reviewBoardService;
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

        user.addReviewBoard(reviewBoard);
        user.addReviewBoardWish(reviewBoardWish);
    }

    public void deleteReviewBoardWish(long userId, long reviewBoardId) {
        User user = findUser(userId);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(reviewBoardId);

        if(!reviewBoardWishService.isExistReviewBoardWish(reviewBoard, user))
            throw new BusinessLogicException(ExceptionCode.WISH_NOT_FOUND);

        reviewBoard.setWish(reviewBoard.getWish() - 1);

        ReviewBoardWish reviewBoardWish = reviewBoardWishRepository.findByReviewBoardIdAndUserId(reviewBoardId, userId);

        user.deleteReviewBoard(reviewBoardId);
        user.deletereviewBoardWish(reviewBoardWish.getReviewBoardWishId());
    }
}