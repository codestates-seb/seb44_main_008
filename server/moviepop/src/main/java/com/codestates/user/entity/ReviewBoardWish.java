package com.codestates.user.entity;

import com.codestates.review_board.entity.ReviewBoard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ReviewBoardWish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewBoardWishId;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "REVIEW_BOARD_ID")
    private ReviewBoard reviewBoard;
}
