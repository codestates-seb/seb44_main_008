package com.codestates.user.repository;

import com.codestates.user.entity.FindPasswordVerificationToken;
import org.springframework.data.repository.CrudRepository;

public interface FindPasswordVerificationTokenRepository extends CrudRepository<FindPasswordVerificationToken, String> {
}
