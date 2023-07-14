package com.codestates.review_board.repository;


import com.codestates.review_board.entity.ReviewBoardTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewBoardTagRepository extends JpaRepository<ReviewBoardTag, Long> {
}
