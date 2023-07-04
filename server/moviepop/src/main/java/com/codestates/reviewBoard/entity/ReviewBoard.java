package com.codestates.reviewBoard.entity;

import com.codestates.audit.Auditable;
import com.codestates.comment.entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
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

//    @ManyToOne
//    private User user;
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
