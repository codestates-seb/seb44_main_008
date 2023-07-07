package com.codestates.movie.init.controller;

import com.codestates.movie.entity.Movie;
import com.codestates.movie.init.service.MovieApiService;
import com.codestates.tag.entity.Tag;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public class MovieApiController {
    private final MovieApiService movieApiService;

    public MovieApiController(MovieApiService movieApiService) {
        this.movieApiService = movieApiService;
    }

    @Scheduled(cron = "00 12 23 6 * ?", zone = "Asia/Seoul")
    public void makeInitData() {
        Set<String> movieCodes = movieApiService.getMovieList();
        Map<String, Object> initData = movieApiService.getMovieDetail(movieCodes);
        movieApiService.makeInitMovieData((List<Movie>) initData.get("movie"));
        movieApiService.makeInitTagData((Set<Tag>) initData.get("tag"));
    }
}
