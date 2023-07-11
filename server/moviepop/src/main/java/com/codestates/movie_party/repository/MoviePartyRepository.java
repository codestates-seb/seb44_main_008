package com.codestates.movie_party.repository;

import com.codestates.movie_party.entity.MovieParty;
import com.codestates.review_board.entity.ReviewBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MoviePartyRepository extends JpaRepository<MovieParty, Long> {
//    @Query(value = "select * from\n" +
//            "movie_party p\n" +
//            "left join (\n" +
//            "\tselect r.review_board_id as review_board_id\n" +
//            "\tfrom review_board r\n" +
//            "\tinner join movie m\n" +
//            "\ton r.movie_id = m.movie_id\n" +
//            "    where m.is_adulted = 0\n" +
//            ") s\n" +
//            "on p.review_board_id = s.review_board_id;",
//        nativeQuery = true)
//    Page<MovieParty> findAllByIsAdulted(Pageable pageable);

    @Query(value = "select m from MovieParty m inner join m.reviewBoard r where r.adulted = :isAdulted order by m.moviePartyId desc")
    Page<MovieParty> findAllByAdulted(boolean isAdulted, Pageable pageable);
}
