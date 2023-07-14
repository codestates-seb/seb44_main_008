package com.codestates.security.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum JwtExpirationEnums {
    ACCESS_TOKEN_EXPIRATION_TIME("JWT 만료 시간 / 120분", 1000L * 60 * 120),
    ACCESS_TOKEN_REISSUE_EXPIRATION_TIME("Access 토큰 만료 시간 / 60분", 1000L * 60 * 60),
    REFRESH_TOKEN_EXPIRATION_TIME("Refresh 토큰 만료 시간 / 7일", 1000L * 60 * 60 * 24 * 7),
    REISSUE_EXPIRATION_TIME("Refresh 토큰 만료 시간 / 3일", 1000L * 60 * 60 * 24 * 3);

    private String description;
    private Long value;
}
