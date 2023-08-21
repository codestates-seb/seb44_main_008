package com.codestates.user.repository;

import com.codestates.user.entity.VerificationCode;
import org.springframework.data.repository.CrudRepository;

public interface VerificationCodeRepository extends CrudRepository<VerificationCode, String> {
}
