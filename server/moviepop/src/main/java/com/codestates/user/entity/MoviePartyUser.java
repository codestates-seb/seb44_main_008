package com.codestates.user.entity;

import com.codestates.movie_party.entity.MovieParty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MoviePartyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long moviePartyUserId;
    private String profileImage;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "movie_party_id")
    private MovieParty movieParty;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MoviePartyUser that = (MoviePartyUser) o;
        return Objects.equals(user.getUserId(), that.user.getUserId()) && Objects.equals(movieParty.getMoviePartyId(), that.movieParty.getMoviePartyId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(user.getUserId(), movieParty.getMoviePartyId());
    }
}
