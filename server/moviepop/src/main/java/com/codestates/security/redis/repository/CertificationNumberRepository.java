package com.codestates.security.redis.repository;

import com.codestates.security.redis.certification.CertificationNumber;
import org.springframework.data.repository.CrudRepository;

public interface CertificationNumberRepository extends CrudRepository<CertificationNumber, Long> {
}
