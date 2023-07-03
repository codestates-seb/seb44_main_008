package com.codestates.user.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.user.entity.User;
import com.codestates.user.repository.UserRepository;
import com.codestates.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final CustomBeanUtils<User> beanUtils;

    public UserService(UserRepository userRepository, CustomBeanUtils<User> beanUtils) {
        this.userRepository = userRepository;
        this.beanUtils = beanUtils;
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
}