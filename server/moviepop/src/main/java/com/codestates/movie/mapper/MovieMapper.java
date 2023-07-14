package com.codestates.movie.mapper;

import com.codestates.movie.dto.MovieDto;
import com.codestates.movie.entity.Movie;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MovieMapper {
    MovieDto.Response movieToMovieResponseDto(Movie movie);
    List<MovieDto.Response> moviesToMovieResponseDtos(List<Movie> movies);
}
