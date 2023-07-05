package com.codestates.reviewBoard.entity;

import com.codestates.audit.Auditable;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import com.codestates.comment.entity.Comment;

import java.util.*;

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

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "reviewBoard", cascade = CascadeType.ALL)
    private List<ReviewBoardWish> reviewBoardWishes = new ArrayList<>();

//
//    @OneToOne
//    private Movie movie;
//
//    @OneToMany(mappedBy = "reviewBoard", cascade = CascadeType.REMOVE)
//    private List<Tag> tags = new ArrayList<>();
//
//    @OneToMany(mappedBy = "reviewBoard", cascade = CascadeType.REMOVE)
//    private List<Group> groups = new ArrayList<>();
//


    @OneToMany(mappedBy = "reviewBoard", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @OrderBy("commentId desc")
    private Set<Comment> comments = new LinkedHashSet<>();

    public void addComment(Comment comment) {

        this.comments.add(comment);
    }

}
