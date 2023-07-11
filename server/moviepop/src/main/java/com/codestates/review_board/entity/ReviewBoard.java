package com.codestates.review_board.entity;

import com.codestates.audit.Auditable;
import com.codestates.movie.entity.Movie;
import com.codestates.movie_party.entity.MovieParty;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import com.codestates.comment.entity.Comment;
import org.hibernate.annotations.DynamicInsert;

import java.util.*;

@DynamicInsert

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ReviewBoard extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewBoardId;
    private String title;
    private String review;
    private int wish;
    private String thumbnail;
    private boolean adulted;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "reviewBoard", cascade = CascadeType.ALL)
    private List<ReviewBoardWish> reviewBoardWishes = new ArrayList<>();

    @OneToMany(mappedBy = "reviewBoard", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewBoardTag> reviewBoardTags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "MOVIE_ID")
    private Movie movie;

    @OneToMany(mappedBy = "reviewBoard", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private List<MovieParty> parties = new ArrayList<>();

    @OneToMany(mappedBy = "reviewBoard", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    @OrderBy("commentId desc")
    private Set<Comment> comments = new LinkedHashSet<>();

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public void addMovieParty(MovieParty movieParty) {
        this.parties.add(movieParty);
    }
}
