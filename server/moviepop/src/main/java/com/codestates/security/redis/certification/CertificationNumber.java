package com.codestates.security.redis.certification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@AllArgsConstructor
@RedisHash("certificationNum")
@Builder
public class CertificationNumber {
    @Id
    private String certificationNum;
    private String username;
    @TimeToLive
    private Long expiration;

    public static CertificationNumber of(String certificationNum, String username) {
        return CertificationNumber.builder()
                .certificationNum(certificationNum)
                .username(username)
                .expiration(180L)
                .build();
    }
}
