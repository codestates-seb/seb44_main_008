package com.codestates.image.config;

import com.codestates.image.service.S3StorageService;
import com.codestates.image.service.StorageService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class StorageConfiguration {
    private static final String REGION = "ap-northeast-2";

    @Bean
    public StorageService s3StorageService() {
        S3Client s3Client =
                S3Client.builder()
                        .region(Region.of(REGION))
                        .credentialsProvider(DefaultCredentialsProvider.create())
                        .build();

        return new S3StorageService(s3Client);
    }
}
