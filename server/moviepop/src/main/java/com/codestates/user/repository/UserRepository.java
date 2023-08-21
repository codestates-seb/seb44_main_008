package com.codestates.user.repository;

import com.codestates.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    Optional<User> findById(long userId);

    @Query("select u from User u join fetch u.authorities a where u.email = :username")
    Optional<User> findByUsernameWithAuthority(String username);

    boolean existsByNickname(String nickname);

    User findByNameAndBirth(String name, LocalDate birth);

    User findByEmailAndName(String email, String name);
}