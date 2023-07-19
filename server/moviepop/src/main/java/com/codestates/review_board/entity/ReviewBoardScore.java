package com.codestates.review_board.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ReviewBoardScore {
    @Id
    @GeneratedValue
    private Long reviewBoardScoreId;
    @OneToOne
    @JoinColumn(name = "review_board_id")
    private ReviewBoard reviewBoard;
    private int userCnt = 0;
    private int moviePartyCnt = 0;
}
