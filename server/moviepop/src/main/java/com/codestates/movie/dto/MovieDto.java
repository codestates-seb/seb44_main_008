package com.codestates.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class MovieDto {
    @Getter
    @AllArgsConstructor
    public static class Response {
        private long movieId;
        private String title;
    }
}
