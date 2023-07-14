package com.codestates.image.service;

import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.user.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String storeProfileImage(MultipartFile profileImage);
    String storeThumbnailImage(MultipartFile thumbnail);
    void deleteProfileImage(User user);
    void deleteThumbnailImage(ReviewBoard reviewBoard);
    String updateProfileImage(MultipartFile profileImage, User user);
    String updateThumbnailImage(MultipartFile thumbnail, ReviewBoard reviewBoard);
}
