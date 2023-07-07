package com.codestates.comment.entity;

import com.codestates.audit.Auditable;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    @Column(nullable = false, length = 2000)
    private String content;
    @Column(nullable = false)
    private Integer likes = 0;

    @ManyToOne
    @JoinColumn(name = "REVIEW_BOARD_ID")
    private ReviewBoard reviewBoard;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    public void setReviewBoard(ReviewBoard reviewBoard) {
        this.reviewBoard = reviewBoard;
        if(!reviewBoard.getComments().contains(this))
            reviewBoard.getComments().add(this);
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
