package com.codestates.reviewBoard.repository;

import com.codestates.reviewBoard.entity.ReviewBoard;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface ReviewBoardRepository extends JpaRepository<ReviewBoard,Long> {
    List<ReviewBoard> findTop12ByOrderByReviewBoardIdDesc();
    List<ReviewBoard> findTop8ByOrderByWishDesc();
}
