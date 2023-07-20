package com.codestates.review_board.repository;

import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.tag.entity.Tag;
import com.codestates.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface ReviewBoardRepository extends JpaRepository<ReviewBoard,Long> {
    List<ReviewBoard> findTop12ByOrderByReviewBoardIdDesc();
//    @Query(value = "select r from ReviewBoard r inner join r.movie m where m.isAdulted = :isAdulted order by r.reviewBoardId desc")
//    List<ReviewBoard> findTop12ByOrderByReviewBoardIdDescByIsAdulted(boolean isAdulted);
    List<ReviewBoard> findTop12ByAdultedIsFalseOrderByReviewBoardIdDesc();
    List<ReviewBoard> findTop8ByOrderByWishDescReviewBoardIdDesc();
//    @Query(value = "select r from ReviewBoard r inner join r.movie m where m.isAdulted = :isAdulted order by r.wish desc, r.reviewBoardId desc")
//    List<ReviewBoard> findTop8ByOrderByWishDescByIsAdulted(boolean isAdulted);
    List<ReviewBoard> findTop8ByAdultedIsFalseOrderByWishDescReviewBoardIdDesc();
//    @Query(value = "select r from ReviewBoard r inner join r.movie m where m.isAdulted = :isAdulted")
//    Page<ReviewBoard> findAllByIsAdulted(boolean isAdulted, Pageable pageable);
    List<ReviewBoard> findDistinctTop8ByReviewBoardTagsTagInOrderByWishDescReviewBoardIdDesc(List<Tag> tags);
    List<ReviewBoard> findDistinctTop8ByAdultedIsFalseAndReviewBoardTagsTagInOrderByWishDescReviewBoardIdDesc(List<Tag> tags);
    Page<ReviewBoard> findAllByAdultedIsFalse(Pageable pageable);

    Page<ReviewBoard> findByReviewBoardTagsTag(Tag tag, Pageable pageable);
    Page<ReviewBoard> findByAdultedIsFalseAndReviewBoardTagsTag(Tag tag, Pageable pageable);

//    @Query(value = "select * from review_board where movie_id in :movieIds", nativeQuery = true)
    Page<ReviewBoard> findByMovieMovieIdIn(List<Long> movieIds, Pageable pageable);
    List<ReviewBoard> findTop5ByUserOrderByCreatedAtDesc(User user);
}
