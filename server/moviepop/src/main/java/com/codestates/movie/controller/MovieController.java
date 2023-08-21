package com.codestates.movie.controller;

import com.codestates.dto.ResponseDto;
import com.codestates.movie.entity.Movie;
import com.codestates.movie.mapper.MovieMapper;
import com.codestates.movie.service.MovieService;
import com.codestates.security.interceptor.JwtParseInterceptor;
import com.codestates.user.entity.User;
import com.codestates.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private final MovieService movieService;
    private final MovieMapper mapper;
    private final UserService userService;

    public MovieController(MovieService movieService, MovieMapper mapper, UserService userService) {
        this.movieService = movieService;
        this.mapper = mapper;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity searchMovies(String q) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        User user = userService.findVerifiedUserByEmail(email);
        List<Movie> searchedMovies = movieService.searchMovies(user, q);
        return new ResponseEntity(
                new ResponseDto.SingleResponseDto<>(mapper.moviesToMovieResponseDtos(searchedMovies)),
                HttpStatus.OK
        );
    }
}
