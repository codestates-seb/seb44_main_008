package com.codestates.movie.entity;

import com.codestates.review_board.entity.ReviewBoard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@DynamicInsert
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;
    private String title;
    private boolean adulted;

    @OneToMany(mappedBy = "movie")
    private List<ReviewBoard> reviewBoards = new ArrayList<>();

    public Movie(String title, boolean adulted) {
        this.title = title;
        this.adulted = adulted;
    }

    public void addReviewBoard(ReviewBoard reviewBoard) {
        this.reviewBoards.add(reviewBoard);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie movie = (Movie) o;
        return adulted == movie.adulted && Objects.equals(title, movie.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, adulted);
    }
}
