package com.codestates.review_board.entity;

import com.codestates.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ReviewBoardTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewBoardTagId;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @ManyToOne
    @JoinColumn(name = "REVIEW_BOARD_ID")
    private ReviewBoard reviewBoard;
}
