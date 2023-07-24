package com.codestates.comment.entity;

import com.codestates.audit.Auditable;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.user.entity.CommentLike;
import com.codestates.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "comments")
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    @Column(nullable = false, length = 1000)
    private String content;
    @Column(nullable = false)
    private Integer likes = 0;

    @ManyToOne
    @JoinColumn(name = "REVIEW_BOARD_ID")
    private ReviewBoard reviewBoard;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CommentLike> commentLikes = new HashSet<>();

    public void setReviewBoard(ReviewBoard reviewBoard) {
        this.reviewBoard = reviewBoard;
        if(!reviewBoard.getComments().contains(this))
            reviewBoard.getComments().add(this);
    }

    public void addCommentLike(CommentLike commentLike) {
        this.commentLikes.add(commentLike);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return Objects.equals(commentId, comment.commentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(commentId);
    }
}
