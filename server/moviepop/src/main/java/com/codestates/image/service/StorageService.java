package com.codestates.image.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    void storeProfileImage(MultipartFile file);
    void storeThumbnailImage(MultipartFile file);
}
