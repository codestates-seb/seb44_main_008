package com.codestates.security.redis;

import lombok.Getter;

@Getter
public class CacheKey {
    public static final String USER = "user";
    public static final int DEFAULT_EXPIRE_SEC = 60;
}
