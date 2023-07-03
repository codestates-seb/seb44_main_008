package com.codestates.reviewBoard.entity;

import com.codestates.audit.Auditable;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(name = "last_modified_at")
    private LocalDateTime modifiedAt;

    @ManyToOne
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
//    @OneToMany(mappedBy = "reviewBoard", cascade = CascadeType.REMOVE)
//    private List<Comment> comments = new ArrayList<>();


}
