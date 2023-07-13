package com.codestates.image.utils;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ImageUtil {
    @Value("${cloud.aws.s3.url}")
    @Getter
    private String url;
    @Getter
    private String defaultThumbnail = "";
    @Getter
    private String defaultProfileImage = "";
}
