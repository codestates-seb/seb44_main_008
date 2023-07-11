package com.codestates.review_board.service;


import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.movie.dto.MovieDto;
import com.codestates.movie.entity.Movie;
import com.codestates.movie.service.MovieService;
import com.codestates.review_board.dto.ReviewBoardDto;
import com.codestates.review_board.entity.ReviewBoardTag;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.tag.service.TagService;
import com.codestates.user.dto.UserDto;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.entity.User;

import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.repository.ReviewBoardRepository;

import com.codestates.user.repository.CommentLikeRepository;
import com.codestates.user.service.CommentLikeService;
import com.codestates.user.service.ReviewBoardWishService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewBoardService {

    private final ReviewBoardRepository reviewBoardRepository;
    private final TagService tagService;
    private final MovieService movieService;
    private final ReviewBoardWishService reviewBoardWishService;
    private final CommentMapper commentMapper;
    private final TagMapper tagMapper;
    private final CommentLikeRepository commentLikeRepository;


//    public ReviewBoardService(ReviewBoardRepository reviewBoardRepository) {
//        this.reviewBoardRepository = reviewBoardRepository;
//    }


    public ReviewBoardService(ReviewBoardRepository reviewBoardRepository, TagService tagService, MovieService movieService,
                              ReviewBoardWishService reviewBoardWishService, CommentMapper commentMapper, TagMapper tagMapper, CommentLikeRepository commentLikeRepository) {
        this.reviewBoardRepository = reviewBoardRepository;
        this.tagService = tagService;
        this.movieService = movieService;
        this.reviewBoardWishService = reviewBoardWishService;
        this.commentMapper = commentMapper;
        this.tagMapper = tagMapper;
        this.commentLikeRepository = commentLikeRepository;
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

    public ReviewBoardDto.DetailResponse updateReviewBoard(User user, ReviewBoard reviewBoard) {
        ReviewBoard getReviewboard = findReviewBoard(user, reviewBoard.getReviewBoardId());
        if(getReviewboard.getUser().getUserId() != user.getUserId())
            throw new BusinessLogicException(ExceptionCode.INVALID_USER);

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
        reviewBoardRepository.save(getReviewboard);

        return findDetailReviewBoard(user, reviewBoard.getReviewBoardId());
    }

    public ReviewBoard findReviewBoard(User user, long reviewId) {
        ReviewBoard reviewBoard = findReviewBoardById(reviewId);

        Period age = getAge(user.getBirth());
        if(age.getYears() < 19 && reviewBoard.getMovie().isAdulted())
            throw new BusinessLogicException(ExceptionCode.CANNOT_SHOW_REVIEW_BOARD);

        return reviewBoard;
    }

    public ReviewBoardDto.DetailResponse findDetailReviewBoard(User user, long reviewId) {
        ReviewBoard reviewBoard = findReviewBoard(user, reviewId);
        boolean isWished = reviewBoardWishService.isExistReviewBoardWish(reviewBoard, user);

        MovieDto.Response movieResponse = new MovieDto.Response(reviewBoard.getMovie().getMovieId(), reviewBoard.getMovie().getTitle());
        UserDto.ReviewBoardResponse userResponse = new UserDto.ReviewBoardResponse(reviewBoard.getUser().getUserId(), reviewBoard.getUser().getNickname(), reviewBoard.getUser().getProfileImage());

        List<CommentDto.Response> commentResponse = reviewBoard.getComments().stream()
                .map(comment -> {
                    boolean isLiked = commentLikeRepository.existsByCommentAndUser(comment,user);
                    CommentDto.Response responseDto = commentMapper.commentToCommentResponseDto(comment);
                    responseDto.setLiked(isLiked);
                    return responseDto;
                })
                .collect(Collectors.toList());

        List<TagDto.Response> tagResponse = reviewBoard.getReviewBoardTags().stream()
                    .map(reviewBoardTag -> tagMapper.tagToResponse(reviewBoardTag.getTag()))
                    .collect(Collectors.toList());

        ReviewBoardDto.DetailResponse detailResponse = ReviewBoardDto.DetailResponse.builder()
                .reviewBoardId(reviewBoard.getReviewBoardId())
                .title(reviewBoard.getTitle())
                .review(reviewBoard.getReview())
                .thumbnail(reviewBoard.getThumbnail())
                .wish(reviewBoard.getWish())
                .wished(isWished)
                .createdAt(reviewBoard.getCreatedAt())
                .movie(movieResponse)
                .user(userResponse)
                .comments(commentResponse)
                .tags(tagResponse)
                .build();

        return detailResponse;
    }

    public Page<ReviewBoard> findAllReviewBoards(User user, int page, int size) {
        Period age = getAge(user.getBirth());
        if(age.getYears() >= 19)
            return reviewBoardRepository.findAll(PageRequest.of(page-1, size,
                Sort.by("reviewBoardId").descending()));
        else
            return reviewBoardRepository.findAllByIsAdulted(false, PageRequest.of(page-1, size,
                    Sort.by("reviewBoardId").descending()));
    }

    public void deleteReviewBoard(User user, long reviewId) {
        ReviewBoard reviewBoard = findReviewBoard(user, reviewId);
        if(reviewBoard.getUser().getUserId() != user.getUserId())
            throw new BusinessLogicException(ExceptionCode.CANNOT_UPDATE_REVIEW_BOARD);

        reviewBoardRepository.delete(reviewBoard);
    }

    public List<ReviewBoard> findReviewBoards(User user) {
        Period age = getAge(user.getBirth());
        if(age.getYears() >= 19)
            return reviewBoardRepository.findTop12ByOrderByReviewBoardIdDesc();
        else {
            List<ReviewBoard> reviewBoards = reviewBoardRepository.findTop12ByOrderByReviewBoardIdDescByIsAdulted(false);
            return reviewBoards.subList(0, Math.min(reviewBoards.size(), 12));
        }

//        return reviewBoardRepository.findTop12ByOrderByReviewBoardIdDesc();
//            return reviewBoardRepository.findTop12ByOrderByReviewBoardIdDescByIsAdulted(false);
    }

    public List<ReviewBoard> findPopularReviewBoards(User user) {
        Period age = getAge(user.getBirth());
        if(age.getYears() >= 19)
            return reviewBoardRepository.findTop8ByOrderByWishDesc();
        else {
            List<ReviewBoard> reviewBoards = reviewBoardRepository.findTop8ByOrderByWishDescByIsAdulted(false);
            return reviewBoards.subList(0, Math.min(reviewBoards.size(), 8));
        }
//        return reviewBoardRepository.findTop8ByOrderByWishDesc();
//            return reviewBoardRepository.findTop8ByOrderByWishDescByIsAdulted(false);
    }

    public Page<ReviewBoard> findSpecificTagReviewBoards(Tag tag, int page, int size) {
        return reviewBoardRepository.findByReviewBoardTagsTag(tag,PageRequest.of(page-1,size,
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

    private Period getAge(LocalDate birth) {
        LocalDateTime now = LocalDateTime.now();

        return Period.between(birth, now.toLocalDate());
    }
}
