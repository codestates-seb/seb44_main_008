package com.codestates.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@Builder
@AllArgsConstructor
@RedisHash("findPasswordVerificationToken")
public class FindPasswordVerificationToken {
    // key -> 토큰
    @Id
    private String token;
    @TimeToLive
    private Long expiration;

    public static FindPasswordVerificationToken of(String token, long remainingSecond) {
        return FindPasswordVerificationToken.builder()
                .token(token)
                .expiration(remainingSecond)
                .build();
    }
}
