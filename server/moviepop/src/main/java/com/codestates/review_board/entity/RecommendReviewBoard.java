package com.codestates.review_board.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class RecommendReviewBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recommendReviewBoardId;
    @OneToOne
    @JoinColumn(name = "review_board_id", nullable = false)
    private ReviewBoard reviewBoard;
    private Integer age;
    private Integer score;
}
