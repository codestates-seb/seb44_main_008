package com.codestates.review_board.mapper;

import com.codestates.movie.entity.Movie;
import com.codestates.review_board.entity.ReviewBoardTag;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.movie.dto.MovieDto;
import com.codestates.movie_party.dto.MoviePartyDto;
import com.codestates.movie_party.mapper.MoviePartyMapper;
import com.codestates.user.dto.UserDto;

import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.review_board.dto.ReviewBoardDto;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.user.entity.ReviewBoardWish;
import com.codestates.user.mapper.UserMapper;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ReviewBoardMapper {
    default ReviewBoard PostToReviewBoard(ReviewBoardDto.Post post, TagMapper tagMapper) {
        List<ReviewBoardTag> reviewBoardTags = tagMapper.reviewBoardsRequestToReviewBoardTags(post.getTags());
        Movie movie = new Movie();
        movie.setMovieId(post.getMovieId());

        ReviewBoard reviewBoard = new ReviewBoard();
        reviewBoard.setTitle(post.getTitle());
        reviewBoard.setReview(post.getReview());
        reviewBoard.setReviewBoardTags(reviewBoardTags);
        reviewBoard.setMovie(movie);

        return reviewBoard;
    }
    default ReviewBoard PatchToReviewBoard(ReviewBoardDto.Patch patch, TagMapper tagMapper) {
        List<ReviewBoardTag> reviewBoardTags = tagMapper.reviewBoardsRequestToReviewBoardTags(patch.getTags());

        ReviewBoard reviewBoard = new ReviewBoard();
        reviewBoard.setReviewBoardId(patch.getReviewBoardId());
        reviewBoard.setTitle(patch.getTitle());
        reviewBoard.setReview(patch.getReview());
        reviewBoard.setReviewBoardTags(reviewBoardTags);

        return reviewBoard;
    }

//    default ReviewBoardDto.Response reviewBoardToResponse(ReviewBoard reviewBoard, TagMapper tagMapper) {
//        UserDto.ReviewBoardResponse userResponse = new UserDto.ReviewBoardResponse(
//                reviewBoard.getUser().getUserId(),
//                reviewBoard.getUser().getNickname(),
//                reviewBoard.getUser().getProfileImage()
//        );
//
//        List<TagDto.response> tagResponse = reviewBoard.getReviewBoardTags().stream()
//                .map(reviewBoardTag -> tagMapper.tagToResponse(reviewBoardTag.getTag()))
//                .collect(Collectors.toList());
//
//
//
//        ReviewBoardDto.Response response = ReviewBoardDto.Response.builder()
//                .reviewBoardId(reviewBoard.getReviewBoardId())
//                .title(reviewBoard.getTitle())
//                .review(reviewBoard.getReview())
//                .wish(reviewBoard.getWish())
//                .thumbnail(reviewBoard.getThumbnail())
//                .createdAt(reviewBoard.getCreatedAt())
//                .user(userResponse)
//                .tags(tagResponse)
//                .build();
//
//        return response;
//    }
    ReviewBoardDto.WishResponse reviewBoardToWishResponse(ReviewBoard reviewBoard);
//    List<ReviewBoardDto.Response> reviewBoardsToResponses(List<ReviewBoard> reviewBoards);
    default ReviewBoardDto.EntireResponse reviewBoardToEntireResponse(ReviewBoard reviewBoard) {
        UserDto.totalReviewBoardResponse userResponse = new UserDto.totalReviewBoardResponse(
                reviewBoard.getUser().getUserId(),
                reviewBoard.getUser().getNickname()
        );

        ReviewBoardDto.EntireResponse response = ReviewBoardDto.EntireResponse.builder()
                .reviewBoardId(reviewBoard.getReviewBoardId())
                .title(reviewBoard.getTitle())
                .thumbnail(reviewBoard.getThumbnail())
                .createdAt(reviewBoard.getCreatedAt())
                .user(userResponse)
                .build();

        return response;
    }
//    @Mapping(source = "user.userId", target = "user.userId")
//    @Mapping(source = "user.nickname", target = "user.nickname")
//    ReviewBoardDto.EntireResponse reviewBoardToEntireResponse(ReviewBoard reviewBoard);
    List<ReviewBoardDto.EntireResponse> reviewBoardsToEntireResponses(List<ReviewBoard> reviewBoards);

//    default ReviewBoardDto.DetailResponse reviewBoardToDetailResponse(ReviewBoard reviewBoard, CommentMapper commentMapper, TagMapper tagMapper, MoviePartyMapper moviePartyMapper, UserMapper userMapper, boolean iswished) {
//        MovieDto.Response movieResponse = new MovieDto.Response(reviewBoard.getMovie().getMovieId(), reviewBoard.getMovie().getTitle());
//        UserDto.ReviewBoardResponse userResponse = new UserDto.ReviewBoardResponse(reviewBoard.getUser().getUserId(), reviewBoard.getUser().getNickname(), reviewBoard.getUser().getProfileImage());
//
//        List<CommentDto.Response> commentResponse = reviewBoard.getComments().stream()
//                .map(comment -> commentMapper.commentToCommentResponseDto(comment))
//                .collect(Collectors.toList());
//
//        List<TagDto.Response> tagResponse = reviewBoard.getReviewBoardTags().stream()
//                .map(reviewBoardTag -> tagMapper.tagToResponse(reviewBoardTag.getTag()))
//                .collect(Collectors.toList());
//        List<MoviePartyDto.EntireResponse> groups = moviePartyMapper.moviePartiesToEntireResponseDtos(reviewBoard.getParties(), userMapper);
//
//        ReviewBoardDto.DetailResponse detailResponse = ReviewBoardDto.DetailResponse.builder()
//                .reviewBoardId(reviewBoard.getReviewBoardId())
//                .title(reviewBoard.getTitle())
//                .review(reviewBoard.getReview())
//                .thumbnail(reviewBoard.getThumbnail())
//                .wish(reviewBoard.getWish())
//                .wished(iswished)
//                .createdAt(reviewBoard.getCreatedAt())
//                .movie(movieResponse)
//                .user(userResponse)
//                .comments(commentResponse)
//                .tags(tagResponse)
//                .groups(groups)
//                .build();
//
//        return detailResponse;
//    }

    default ReviewBoardDto.MainResponse reviewBoardsToDetailResponses(List<ReviewBoard> reviewBoards, List<ReviewBoard> popularBoards) {
        List<ReviewBoardDto.EntireResponse> reviewBoardEntire = reviewBoardsToEntireResponses(reviewBoards);
        List<ReviewBoardDto.EntireResponse> popularReviewBoardEntire = reviewBoardsToEntireResponses(popularBoards);

        return ReviewBoardDto.MainResponse.builder()
                .popularBoards(popularReviewBoardEntire)
                .boards(reviewBoardEntire)
                .build();
    }

    List<ReviewBoardDto.UserResponse> reviewBoardToUserResponses(List<ReviewBoard> reviewBoards); // UserResponse를 가져오기 위한 mapper
    default ReviewBoardDto.UserResponse reviewBoardToUserResponse(ReviewBoard reviewBoard, TagMapper tagMapper) { // UserResponse를 가져오기 위한 mapper
        UserDto.ReviewBoardResponse user = new UserDto.ReviewBoardResponse(
                reviewBoard.getUser().getUserId(),
                reviewBoard.getUser().getNickname(),
                reviewBoard.getUser().getProfileImage()
        );

        ReviewBoardDto.UserResponse userResponse = ReviewBoardDto.UserResponse.builder()
                .reviewBoardId(reviewBoard.getReviewBoardId())
                .title(reviewBoard.getTitle())
                .movieTitle(reviewBoard.getTitle())
                .user(user)
                .build();

        return userResponse;
    }

    List<ReviewBoardDto.UserResponse> reviewBoardWishToUserResponses(List<ReviewBoardWish> reviewBoardWishes);
    default ReviewBoardDto.UserResponse reviewBoardWishToUserResponse(ReviewBoardWish reviewBoardWish) {
        UserDto.ReviewBoardResponse user = new UserDto.ReviewBoardResponse(
                reviewBoardWish.getUser().getUserId(),
                reviewBoardWish.getUser().getNickname(),
                reviewBoardWish.getUser().getProfileImage()
        );

        ReviewBoardDto.UserResponse userResponse = ReviewBoardDto.UserResponse.builder()
                .reviewBoardId(reviewBoardWish.getReviewBoard().getReviewBoardId())
                .title(reviewBoardWish.getReviewBoard().getTitle())
                .movieTitle(reviewBoardWish.getReviewBoard().getTitle())
                .user(user)
                .build();

        return userResponse;
    }

}
