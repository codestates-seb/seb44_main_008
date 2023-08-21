package com.codestates.user.entity;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import javax.persistence.Id;

@AllArgsConstructor
@Getter
@Builder
@RedisHash("verificationCode")
public class VerificationCode {
    // key -> 이메일, value -> 인증번호

    @Id
    private String email;
    private String verificationCode;
    @TimeToLive
    private Long expiration;

    public static VerificationCode of(String email, String verificationCode, long remainingSecond) {
        return VerificationCode.builder()
                .email(email)
                .verificationCode(verificationCode)
                .expiration(remainingSecond)
                .build();
    }
}
