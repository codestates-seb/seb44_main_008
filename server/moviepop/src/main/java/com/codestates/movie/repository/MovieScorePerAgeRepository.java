package com.codestates.movie.repository;

import com.codestates.movie.entity.Movie;
import com.codestates.movie.entity.MovieScorePerAge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MovieScorePerAgeRepository extends JpaRepository<MovieScorePerAge, Long> {
    MovieScorePerAge findByMovie(Movie movie);
}
