package com.codestates.movie.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.movie.entity.Movie;
import com.codestates.movie.repository.MovieRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
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

    public Movie findMovie(long movieId) {
        return findVerifiedMovieId(movieId);
    }

    public Set<Movie> findMovies() {
        return movieRepository.findAll().stream().collect(Collectors.toSet());
    }


    public List<Movie> findSearchedMovies(String title) {
        List<Movie> movies = movieRepository.findByTitleContains(title);
        if(movies.size() == 0) throw new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND);
        return movies;
    }

    private Movie findVerifiedMovieId(long movieId) {
        Optional<Movie> optionalMovie = movieRepository.findById(movieId);
        return optionalMovie.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND));
    }

    public List<Movie> searchMovies(String query) {
        return movieRepository.findByTitleContains(query);
    }
}
