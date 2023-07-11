package com.codestates.image.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j
public class S3StorageService implements StorageService {
    private static final String BUCKET_NAME = "be44-009";
    private static final String BUCKET_PROFILE_IMAGE_PATH = "profile-image";
    private static final String BUCKET_THUMBNAIL_IMAGE_PATH = "thumbnail";
    private final S3Client s3Client;

    public S3StorageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Override
    public void storeProfileImage(MultipartFile file) {
        String key = makeS3OBjectKey(BUCKET_PROFILE_IMAGE_PATH, file);

        PutObjectRequest request = createPutObjectRequest(BUCKET_NAME, key);

        try {
            final Path path = multipartFileToPath(file);
            PutObjectResponse response = s3Client.putObject(request, path);

            log.info("# File uploaded successfully. ETag: " + response.eTag());
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            s3Client.close();
        }
    }

    @Override
    public void storeThumbnailImage(MultipartFile file) {
        String key = makeS3OBjectKey(BUCKET_THUMBNAIL_IMAGE_PATH, file);

        PutObjectRequest request = createPutObjectRequest(BUCKET_NAME, key);

        try {
            final Path path = multipartFileToPath(file);
            PutObjectResponse response = s3Client.putObject(request, path);

            log.info("# File uploaded successfully. ETag: " + response.eTag());
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            s3Client.close();
        }
    }

    private String makeS3OBjectKey(String bucketCoffeeImagePath, MultipartFile multipartFile) {
        final String fileName = multipartFile.getOriginalFilename();
        return bucketCoffeeImagePath.concat("/").concat(fileName);
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
            System.out.println("path = " + path);

            Files.write(path, file.getBytes());
            return path;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
