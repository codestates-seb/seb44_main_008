package com.codestates.movie.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.movie.entity.Movie;
import com.codestates.movie.entity.MovieScorePerAge;
import com.codestates.movie.repository.MovieScorePerAgeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MovieScorePerAgeService {
    private final MovieScorePerAgeRepository movieScorePerAgeRepository;

    public MovieScorePerAgeService(MovieScorePerAgeRepository movieScorePerAgeRepository) {
        this.movieScorePerAgeRepository = movieScorePerAgeRepository;
    }

    public MovieScorePerAge createMovieScorePerAge(Movie movie) {
        MovieScorePerAge movieScorePerAge = new MovieScorePerAge();
        movieScorePerAge.setMovie(movie);

        return movieScorePerAgeRepository.save(movieScorePerAge);
    }

    public MovieScorePerAge addMovieScorePerAge(Movie movie, int ageRange) {
        MovieScorePerAge movieScorePerAge = findMovieScorePerAgeByMovie(movie);

        if(movieScorePerAge == null)
            movieScorePerAge = createMovieScorePerAge(movie);

        if(ageRange == 0) movieScorePerAge.setZero(movieScorePerAge.getZero() + 1);
        else if(ageRange == 1) movieScorePerAge.setTen(movieScorePerAge.getTen() + 1);
        else if(ageRange == 2) movieScorePerAge.setTwenty(movieScorePerAge.getTwenty() + 1);
        else if(ageRange == 3) movieScorePerAge.setThirty(movieScorePerAge.getThirty() + 1);
        else if(ageRange == 4) movieScorePerAge.setFourty(movieScorePerAge.getFourty() + 1);
        else if(ageRange == 5) movieScorePerAge.setFifty(movieScorePerAge.getFifty() + 1);
        else movieScorePerAge.setOther(movieScorePerAge.getOther() + 1);

        return movieScorePerAgeRepository.save(movieScorePerAge);
    }

    public MovieScorePerAge subtractMovieScorePerAge(Movie movie, int ageRange) {
        MovieScorePerAge movieScorePerAge = findMovieScorePerAgeByMovie(movie);

        if(ageRange == 0) movieScorePerAge.setZero(movieScorePerAge.getZero() - 1);
        else if(ageRange == 1) movieScorePerAge.setTen(movieScorePerAge.getTen() - 1);
        else if(ageRange == 2) movieScorePerAge.setTwenty(movieScorePerAge.getTwenty() - 1);
        else if(ageRange == 3) movieScorePerAge.setThirty(movieScorePerAge.getThirty() - 1);
        else if(ageRange == 4) movieScorePerAge.setFourty(movieScorePerAge.getFourty() - 1);
        else if(ageRange == 5) movieScorePerAge.setFifty(movieScorePerAge.getFifty() - 1);
        else movieScorePerAge.setOther(movieScorePerAge.getOther() - 1);

        return movieScorePerAgeRepository.save(movieScorePerAge);
    }

    public MovieScorePerAge findMovieScorePerAgeByMovie(Movie movie) {
        return movieScorePerAgeRepository.findByMovie(movie);
//        return movieScorePerAgeRepository.findByMovie(movie).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND));
    }

    public int getMovieScorePerAge(Movie movie, int ageRange) {
        MovieScorePerAge movieScorePerAge = findMovieScorePerAgeByMovie(movie);

        int score = 0;
        if(ageRange == 0) score = movieScorePerAge.getZero();
        else if(ageRange == 1) score = movieScorePerAge.getTen();
        else if(ageRange == 2) score = movieScorePerAge.getTwenty();
        else if(ageRange == 3) score = movieScorePerAge.getThirty();
        else if(ageRange == 4) score = movieScorePerAge.getFourty();
        else if(ageRange == 5) score = movieScorePerAge.getFifty();
        else score = movieScorePerAge.getOther();

        return score;
    }
}
