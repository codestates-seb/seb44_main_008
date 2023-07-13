package com.codestates.image.service;

import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j
public class S3StorageService implements StorageService {
    @Value("${cloud.aws.s3.bucket}")
    private String BUCKET_NAME;
    @Value("${cloud.aws.s3.profile-path}")
    private String BUCKET_PROFILE_IMAGE_PATH;
    @Value("${cloud.aws.s3.thumbnail-path}")
    private String BUCKET_THUMBNAIL_IMAGE_PATH;
    private final S3Client s3Client;

    public S3StorageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Override
    public String storeProfileImage(MultipartFile profileImage) {
        try {
            final Path path = multipartFileToPath(profileImage);
            String key = makeS3OBjectKey(BUCKET_PROFILE_IMAGE_PATH, path);
            PutObjectRequest request = createPutObjectRequest(BUCKET_NAME, key);
            PutObjectResponse response = s3Client.putObject(request, path);

            log.info("# File uploaded successfully. ETag: " + response.eTag());
            return key;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String storeThumbnailImage(MultipartFile thumbnail) {
        try {
            final Path path = multipartFileToPath(thumbnail);
            String key = makeS3OBjectKey(BUCKET_THUMBNAIL_IMAGE_PATH, path);
            PutObjectRequest request = createPutObjectRequest(BUCKET_NAME, key);
            PutObjectResponse response = s3Client.putObject(request, path);

            log.info("# File uploaded successfully. ETag: " + response.eTag());
            return key;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String makeS3OBjectKey(String bucketImagePath, Path path) {
        final String fileName = path.getFileName().toString();
        return bucketImagePath.concat("/").concat(fileName);
    }

    private PutObjectRequest createPutObjectRequest(String bucketName, String key) {
        return PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
    }

    private Path multipartFileToPath(MultipartFile file) {
        Path path = null;
        try {
            path = Files.createTempFile("temp", file.getOriginalFilename());

            Files.write(path, file.getBytes());
            return path;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteProfileImage(User user) {
        s3Client.deleteObject(DeleteObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(user.getProfileImage())
                .build());
    }

    @Override
    public void deleteThumbnailImage(ReviewBoard reviewBoard) {
        s3Client.deleteObject(DeleteObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(reviewBoard.getThumbnail())
                .build());
    }

    @Override
    public String updateProfileImage(MultipartFile profileImage, User user) {
        if(user.getProfileImage() != null)
            deleteProfileImage(user);

        if(profileImage != null)
            return storeProfileImage(profileImage);
        return null;
    }

    @Override
    public String updateThumbnailImage(MultipartFile thumbnail, ReviewBoard reviewBoard) {
        if(reviewBoard.getThumbnail() != null)
            deleteThumbnailImage(reviewBoard);

        if(thumbnail != null)
            return storeThumbnailImage(thumbnail);
        return null;
    }
}
