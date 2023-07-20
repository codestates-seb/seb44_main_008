package com.codestates.review_board.entity;

import com.codestates.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @OneToOne
    @JoinColumn(name = "review_board_id")
    private ReviewBoard reviewBoard;

    private LocalDateTime visitedAt;
}
