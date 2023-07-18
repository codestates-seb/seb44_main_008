package com.codestates.image.utils;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ImageUtil {
    @Value("${cloud.aws.s3.url}")
    @Getter
    private String url;
    @Value("${cloud.aws.s3.default-thumbnail}")
    @Getter
    private String defaultThumbnail;
    @Value("${cloud.aws.s3.default-profile}")
    @Getter
    private String defaultProfileImage;
}
