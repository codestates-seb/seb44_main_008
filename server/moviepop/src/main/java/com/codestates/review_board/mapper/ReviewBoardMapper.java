package com.codestates.review_board.mapper;


import com.codestates.movie.dto.MovieDto;
import com.codestates.user.dto.UserDto;

import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.review_board.dto.ReviewBoardDto;
import com.codestates.review_board.entity.ReviewBoard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ReviewBoardMapper {
    @Mapping(source = "movieId", target = "movie.movieId")
    ReviewBoard PostToReviewBoard(ReviewBoardDto.Post post);
    ReviewBoard PatchToReviewBoard(ReviewBoardDto.Patch patch);
    default ReviewBoardDto.Response reviewBoardToResponse(ReviewBoard reviewBoard) {
        UserDto.ReviewBoardResponse userResponse = new UserDto.ReviewBoardResponse(
                reviewBoard.getUser().getUserId(),
                reviewBoard.getUser().getNickname(),
                reviewBoard.getUser().getProfileImage()
        );

        ReviewBoardDto.Response response = ReviewBoardDto.Response.builder()
                .reviewBoardId(reviewBoard.getReviewBoardId())
                .title(reviewBoard.getTitle())
                .review(reviewBoard.getReview())
                .wish(reviewBoard.getWish())
                .thumbnail(reviewBoard.getThumbnail())
                .createdAt(reviewBoard.getCreatedAt())
                .user(userResponse)
                .build();

        return response;
    }
    ReviewBoardDto.WishResponse reviewBoardToWishResponse(ReviewBoard reviewBoard);
    List<ReviewBoardDto.Response> reviewBoardsToResponses(List<ReviewBoard> reviewBoards);
    @Mapping(source = "user.userId", target = "user.userId")
    @Mapping(source = "user.nickname", target = "user.nickname")
    ReviewBoardDto.EntireResponse reviewBoardToEntireResponse(ReviewBoard reviewBoard);
    List<ReviewBoardDto.EntireResponse> reviewBoardsToEntireResponses(List<ReviewBoard> reviewBoards);

    default ReviewBoardDto.DetailResponse reviewBoardToDetailResponse(ReviewBoard reviewBoard, CommentMapper commentMapper) {
        MovieDto.Response movieResponse = new MovieDto.Response(reviewBoard.getMovie().getMovieId(), reviewBoard.getMovie().getTitle());
        UserDto.ReviewBoardResponse userResponse = new UserDto.ReviewBoardResponse(reviewBoard.getUser().getUserId(), reviewBoard.getUser().getNickname(), reviewBoard.getUser().getProfileImage());

        List<CommentDto.Response> commentResponse = reviewBoard.getComments().stream()
                .map(comment -> commentMapper.commentToCommentResponseDto(comment))
                .collect(Collectors.toList());

        ReviewBoardDto.DetailResponse detailResponse = ReviewBoardDto.DetailResponse.builder()
                .reviewBoardId(reviewBoard.getReviewBoardId())
                .title(reviewBoard.getTitle())
                .review(reviewBoard.getReview())
                .thumbnail(reviewBoard.getThumbnail())
                .wish(reviewBoard.getWish())
                .createdAt(reviewBoard.getCreatedAt())
                .movie(movieResponse)
                .user(userResponse)
                .comments(commentResponse)
                .build();

        return detailResponse;
    }

    default ReviewBoardDto.MainResponse reviewBoardsToDetailResponses(List<ReviewBoard> reviewBoards, List<ReviewBoard> popularBoards) {
        List<ReviewBoardDto.EntireResponse> reviewBoardEntire = reviewBoardsToEntireResponses(reviewBoards);
        List<ReviewBoardDto.EntireResponse> popularReviewBoardEntire = reviewBoardsToEntireResponses(popularBoards);

        return ReviewBoardDto.MainResponse.builder()
                .popularBoards(popularReviewBoardEntire)
                .boards(reviewBoardEntire)
                .build();
    }
}
