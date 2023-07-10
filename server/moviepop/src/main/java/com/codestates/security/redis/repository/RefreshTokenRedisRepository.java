package com.codestates.security.redis.repository;

import com.codestates.security.redis.token.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRedisRepository extends CrudRepository<RefreshToken, String> {
}
