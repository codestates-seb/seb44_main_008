package com.codestates.movie_party.entity;

import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.user.entity.MoviePartyUser;
import com.codestates.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MovieParty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long moviePartyId;
    @Column(nullable = false, length = 200)
    private String title;
    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime meetingDate;
    @Column(nullable = false, length = 250)
    private String location;
    @Column(nullable = false)
    private Integer maxCapacity;
    @Column(nullable = false)
    private Integer currentParticipant = 1;
    @Column(nullable = false, length = 2000)
    private String content;
    @Column(nullable = false, length = 200)
    private String movieTitle;

    @ManyToOne
    @JoinColumn(name = "review_board_id")
    private ReviewBoard reviewBoard;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "movieParty", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private Set<MoviePartyUser> moviePartyUsers = new HashSet<>();

    public void addMoviePartyUser(MoviePartyUser moviePartyUser) {
        this.moviePartyUsers.add(moviePartyUser);
    }
}
