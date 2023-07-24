package com.codestates.movie.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MovieScorePerAge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieScorePerAgeId;
    @OneToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
    private Integer zero = 0;
    private Integer ten = 0;
    private Integer twenty = 0;
    private Integer thirty = 0;
    private Integer fourty = 0;
    private Integer fifty = 0;
    private Integer other = 0;
}
