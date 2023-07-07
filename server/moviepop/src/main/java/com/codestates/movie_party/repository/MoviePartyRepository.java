package com.codestates.movie_party.repository;

import com.codestates.movie_party.entity.MovieParty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoviePartyRepository extends JpaRepository<MovieParty, Long> {
}
