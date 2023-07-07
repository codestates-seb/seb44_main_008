package com.codestates.reviewBoard.repository;

import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.tag.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface ReviewBoardRepository extends JpaRepository<ReviewBoard,Long> {
    List<ReviewBoard> findTop12ByOrderByReviewBoardIdDesc();
    List<ReviewBoard> findTop8ByOrderByWishDesc();

    Page<ReviewBoard> findByReviewBoardTagsTag(Tag tag, Pageable pageable);
}
