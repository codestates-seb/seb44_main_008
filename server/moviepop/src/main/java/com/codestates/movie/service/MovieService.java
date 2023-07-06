package com.codestates.movie.service;

import com.codestates.movie.entity.Movie;
import com.codestates.movie.repository.MovieRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public void makeInitData(List<Movie> movieList) {
        movieRepository.saveAll(movieList);
    }

    public Set<Movie> findMovies() {
        return movieRepository.findAll().stream().collect(Collectors.toSet());
    }
}
