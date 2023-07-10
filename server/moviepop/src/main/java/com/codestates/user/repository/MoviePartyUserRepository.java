package com.codestates.user.repository;

import com.codestates.movie_party.entity.MovieParty;
import com.codestates.user.entity.MoviePartyUser;
import com.codestates.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoviePartyUserRepository extends JpaRepository<MoviePartyUser, Long> {
    boolean existsByUserAndMovieParty(User user, MovieParty movieParty);
}
