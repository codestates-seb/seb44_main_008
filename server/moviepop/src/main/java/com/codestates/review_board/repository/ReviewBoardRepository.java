package com.codestates.review_board.repository;

import com.codestates.review_board.entity.ReviewBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface ReviewBoardRepository extends JpaRepository<ReviewBoard,Long> {
    List<ReviewBoard> findTop12ByOrderByReviewBoardIdDesc();
    @Query(value = "select r from ReviewBoard r inner join r.movie m where m.isAdulted = :isAdulted order by r.reviewBoardId desc")
    List<ReviewBoard> findTop12ByOrderByReviewBoardIdDescByIsAdulted(boolean isAdulted);
    List<ReviewBoard> findTop8ByOrderByWishDesc();
    @Query(value = "select r from ReviewBoard r inner join r.movie m where m.isAdulted = :isAdulted order by r.wish desc")
    List<ReviewBoard> findTop8ByOrderByWishDescByIsAdulted(boolean isAdulted);
    @Query(value = "select r from ReviewBoard r inner join r.movie m where m.isAdulted = :isAdulted")
    Page<ReviewBoard> findAllByIsAdulted(boolean isAdulted, Pageable pageable);
}
