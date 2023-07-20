package com.codestates.review_board.entity;

import com.codestates.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ReviewBoardRecentVisit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewBoardRecentVisitId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "review_board_id")
    private ReviewBoard reviewBoard;

    private LocalDateTime visitedAt;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReviewBoardRecentVisit that = (ReviewBoardRecentVisit) o;
        return Objects.equals(user, that.user) && Objects.equals(reviewBoard, that.reviewBoard);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, reviewBoard);
    }
}
