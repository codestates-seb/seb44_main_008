package com.codestates.movie.entity;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
public class Movie {
    private String movieCode;
    private String title;
    private String genre;
    private String isAdulted;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie movie = (Movie) o;
        return movieCode == movie.movieCode;
    }

    @Override
    public int hashCode() {
        return Objects.hash(movieCode);
    }

    @Override
    public String toString() {
        return "Movie{" +
                "movieCode='" + movieCode + '\'' +
                ", title='" + title + '\'' +
                ", genre='" + genre + '\'' +
                ", isAdulted='" + isAdulted + '\'' +
                '}';
    }
}
