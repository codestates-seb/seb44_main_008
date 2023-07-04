package com.codestates.reviewBoard.repository;

import com.codestates.reviewBoard.entity.ReviewBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewBoardRepository extends JpaRepository<ReviewBoard,Long> {
}
