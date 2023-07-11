package com.codestates.review_board.service;


import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.movie.entity.Movie;
import com.codestates.movie.service.MovieService;
import com.codestates.review_board.entity.ReviewBoardTag;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.service.TagService;
import com.codestates.user.entity.User;

import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.repository.ReviewBoardRepository;

import com.codestates.utils.UserUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewBoardService {

    private final ReviewBoardRepository reviewBoardRepository;
    private final TagService tagService;
    private final MovieService movieService;

//    public ReviewBoardService(ReviewBoardRepository reviewBoardRepository) {
//        this.reviewBoardRepository = reviewBoardRepository;
//    }


    public ReviewBoardService(ReviewBoardRepository reviewBoardRepository, TagService tagService, MovieService movieService) {
        this.reviewBoardRepository = reviewBoardRepository;
        this.tagService = tagService;
        this.movieService = movieService;
    }

    public ReviewBoard createReviewBoard(User user, ReviewBoard reviewBoard) {
        Movie movie = movieService.findMovie(reviewBoard.getMovie().getMovieId());
        reviewBoard.setMovie(movie);

        for(ReviewBoardTag reviewBoardTag : reviewBoard.getReviewBoardTags()) {
            reviewBoardTag.setReviewBoard(reviewBoard);
        }

        user.addReviewBoard(reviewBoard);

        reviewBoard.setUser(user);

        return reviewBoardRepository.save(reviewBoard);
    }

    public ReviewBoard updateReviewBoard(User user, ReviewBoard reviewBoard) {
        ReviewBoard getReviewboard = findReviewBoard(user, reviewBoard.getReviewBoardId());
        if(getReviewboard.getUser().getUserId() != user.getUserId())
            throw new BusinessLogicException(ExceptionCode.CANNOT_UPDATE_REVIEW_BOARD);

        Optional.ofNullable(reviewBoard.getTitle())
                .ifPresent(title -> getReviewboard.setTitle(title));
        Optional.ofNullable(reviewBoard.getReview())
                .ifPresent(review -> getReviewboard.setReview(review));

        for(ReviewBoardTag reviewBoardTag : reviewBoard.getReviewBoardTags()) {
            Tag tag = tagService.findTagById(reviewBoardTag.getTag().getTagId());
            reviewBoardTag.setTag(tag);
            reviewBoardTag.setReviewBoard(getReviewboard);
        }

        List<ReviewBoardTag> newTags = reviewBoard.getReviewBoardTags();
        getReviewboard.getReviewBoardTags().clear();
        getReviewboard.getReviewBoardTags().addAll(newTags);

        //영화제목, 태그, 썸네일 설정해야함.

        return reviewBoardRepository.save(getReviewboard);
    }

    public ReviewBoard findReviewBoard(User user, long reviewId) {
        ReviewBoard reviewBoard = findReviewBoardById(reviewId);

        Period age = UserUtils.getAge(user);
        if(age.getYears() < 19 && reviewBoard.isAdulted())
            throw new BusinessLogicException(ExceptionCode.CANNOT_SHOW_REVIEW_BOARD);

        return reviewBoard;
    }

    public Page<ReviewBoard> findAllReviewBoards(User user, int page, int size) {
        Period age = UserUtils.getAge(user);
        if(age.getYears() >= 19)
            return reviewBoardRepository.findAll(PageRequest.of(page-1, size,
                Sort.by("reviewBoardId").descending()));
        else
            return reviewBoardRepository.findAllByAdultedIsFalse(PageRequest.of(page-1, size,
                    Sort.by("reviewBoardId").descending()));
    }

    public void deleteReviewBoard(User user, long reviewId) {
        ReviewBoard reviewBoard = findReviewBoard(user, reviewId);
        if(reviewBoard.getUser().getUserId() != user.getUserId())
            throw new BusinessLogicException(ExceptionCode.CANNOT_UPDATE_REVIEW_BOARD);

        reviewBoardRepository.delete(reviewBoard);
    }

    public List<ReviewBoard> findReviewBoards(User user) {
        Period age = UserUtils.getAge(user);
        if(age.getYears() >= 19)
            return reviewBoardRepository.findTop12ByOrderByReviewBoardIdDesc();
        else {
            List<ReviewBoard> reviewBoards = reviewBoardRepository.findTop12ByAdultedIsFalseOrderByReviewBoardIdDesc();
            return reviewBoards.subList(0, Math.min(reviewBoards.size(), 12));
        }

//        return reviewBoardRepository.findTop12ByOrderByReviewBoardIdDesc();
//            return reviewBoardRepository.findTop12ByOrderByReviewBoardIdDescByIsAdulted(false);
    }

    public List<ReviewBoard> findPopularReviewBoards(User user) {
        Period age = UserUtils.getAge(user);
        if(age.getYears() >= 19)
            return reviewBoardRepository.findTop8ByOrderByWishDescReviewBoardIdDesc();
        else {
            List<ReviewBoard> reviewBoards = reviewBoardRepository.findTop8ByAdultedIsFalseOrderByWishDescReviewBoardIdDesc();
            return reviewBoards.subList(0, Math.min(reviewBoards.size(), 8));
        }
//        return reviewBoardRepository.findTop8ByOrderByWishDesc();
//            return reviewBoardRepository.findTop8ByOrderByWishDescByIsAdulted(false);
    }

    public Page<ReviewBoard> findSpecificTagReviewBoards(User user, Tag tag, int page, int size) {
        Period age = UserUtils.getAge(user);

        if(age.getYears() >= 19)
            return reviewBoardRepository.findByReviewBoardTagsTag(tag,PageRequest.of(page-1,size,
                    Sort.by("reviewBoardId").descending()));
        else
            return reviewBoardRepository.findByAdultedIsFalseAndReviewBoardTagsTag(tag,PageRequest.of(page-1,size,
                    Sort.by("reviewBoardId").descending()));
    }

    public Page<ReviewBoard> findSearchedReviewBoards(String title, int page, int size) {
        List<Movie> movies = movieService.findSearchedMovies(title);
        List<Long> movieIds = movies.stream()
                .map(Movie::getMovieId)
                .collect(Collectors.toList());
        System.out.println("movieIds = " + movieIds);

        return reviewBoardRepository.findByMovieMovieIdIn(movieIds, PageRequest.of(page-1,size,
                Sort.by("reviewBoardId").descending()));
    }
    @Transactional(readOnly = true)
    public ReviewBoard findReviewBoardById(long reviewId) {
        Optional<ReviewBoard> optionalReviewBoard = reviewBoardRepository.findById(reviewId);
        ReviewBoard findReviewBoard =
                optionalReviewBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_BOARD_NOT_FOUND));
        return findReviewBoard;
    }
}
