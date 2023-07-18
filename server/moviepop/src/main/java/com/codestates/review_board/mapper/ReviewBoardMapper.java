package com.codestates.review_board.mapper;

import com.codestates.image.utils.ImageUtil;
import com.codestates.movie.entity.Movie;
import com.codestates.review_board.entity.ReviewBoardTag;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.entity.Tag;
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

import java.util.ArrayList;
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
    default ReviewBoardDto.EntireResponse reviewBoardToEntireResponse(ReviewBoard reviewBoard, UserMapper userMapper, ImageUtil imageUtil) {
//        UserDto.totalReviewBoardResponse userResponse = new UserDto.totalReviewBoardResponse(
//                reviewBoard.getUser().getUserId(),
//                reviewBoard.getUser().getNickname()
//        );
        UserDto.totalReviewBoardResponse userResponse = userMapper.userToTotalReviewBoardResponseDto(reviewBoard.getUser());

        String thumbnail = reviewBoard.getThumbnail();
        if(thumbnail == null)
            thumbnail = imageUtil.getUrl() + imageUtil.getDefaultThumbnail();
        else
            thumbnail = imageUtil.getUrl() + thumbnail;

        ReviewBoardDto.EntireResponse response = ReviewBoardDto.EntireResponse.builder()
                .reviewBoardId(reviewBoard.getReviewBoardId())
                .title(reviewBoard.getTitle())
                .thumbnail(thumbnail)
                .createdAt(reviewBoard.getCreatedAt())
                .user(userResponse)
                .build();

        return response;
    }
//    @Mapping(source = "user.userId", target = "user.userId")
//    @Mapping(source = "user.nickname", target = "user.nickname")
//    ReviewBoardDto.EntireResponse reviewBoardToEntireResponse(ReviewBoard reviewBoard);
    default List<ReviewBoardDto.EntireResponse> reviewBoardsToEntireResponses(List<ReviewBoard> reviewBoards, UserMapper userMapper, ImageUtil imageUtil) {
        List<ReviewBoardDto.EntireResponse> response = new ArrayList<>();

        for(ReviewBoard reviewBoard : reviewBoards) {
            ReviewBoardDto.EntireResponse entireResponse = reviewBoardToEntireResponse(reviewBoard, userMapper, imageUtil);
            response.add(entireResponse);
        }

        return response;
    }

    default ReviewBoardDto.TagResponse reviewBoardsToTagResponseDto(List<ReviewBoard> reviewBoards, UserMapper userMapper, Tag tag, ImageUtil imageUtil) {
        List<ReviewBoardDto.EntireResponse> responses = reviewBoardsToEntireResponses(reviewBoards, userMapper, imageUtil);
        ReviewBoardDto.TagResponse tagResponse = new ReviewBoardDto.TagResponse(tag.getTagName(), responses);

        return tagResponse;
    }

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

    default ReviewBoardDto.MainResponse reviewBoardsToDetailResponses(List<ReviewBoard> reviewBoards, List<ReviewBoard> popularBoards, List<ReviewBoard> recommendBoards, UserMapper userMapper, ImageUtil imageUtil) {
        List<ReviewBoardDto.EntireResponse> reviewBoardEntire = reviewBoardsToEntireResponses(reviewBoards, userMapper, imageUtil);
        List<ReviewBoardDto.EntireResponse> popularReviewBoardEntire = reviewBoardsToEntireResponses(popularBoards, userMapper, imageUtil);
        List<ReviewBoardDto.EntireResponse> recommendBoardEntire = reviewBoardsToEntireResponses(recommendBoards, userMapper, imageUtil);

        return ReviewBoardDto.MainResponse.builder()
                .popularBoards(popularReviewBoardEntire)
                .boards(reviewBoardEntire)
                .recommendBoards(recommendBoardEntire)
                .build();
    }

    default ReviewBoardDto.UserResponse reviewBoardToUserResponse(ReviewBoard reviewBoard, TagMapper tagMapper, UserMapper userMapper, ImageUtil imageUtil) { // UserResponse를 가져오기 위한 mapper
//        UserDto.ReviewBoardResponse user = new UserDto.ReviewBoardResponse(
//                reviewBoard.getUser().getUserId(),
//                reviewBoard.getUser().getNickname(),
//                reviewBoard.getUser().getProfileImage()
//        );

        UserDto.ReviewBoardResponse user = userMapper.userToReviewBoardResponseDto(reviewBoard.getUser(), imageUtil);

        ReviewBoardDto.UserResponse userResponse = ReviewBoardDto.UserResponse.builder()
                .reviewBoardId(reviewBoard.getReviewBoardId())
                .title(reviewBoard.getTitle())
                .movieTitle(reviewBoard.getMovie().getTitle())
                .user(user)
                .build();

        return userResponse;
    }

    default List<ReviewBoardDto.UserResponse> reviewBoardToUserResponses(List<ReviewBoard> reviewBoards, TagMapper tagMapper, UserMapper userMapper, ImageUtil imageUtil) { // UserResponse를 가져오기 위한 mapper
        List<ReviewBoardDto.UserResponse> userResponses = new ArrayList<>();
        for(ReviewBoard reviewBoard : reviewBoards) {
            ReviewBoardDto.UserResponse userResponse = reviewBoardToUserResponse(reviewBoard, tagMapper, userMapper, imageUtil);
            userResponses.add(userResponse);
        }

        return userResponses;
    }

    default ReviewBoardDto.UserResponse reviewBoardWishToUserResponse(ReviewBoardWish reviewBoardWish, UserMapper userMapper, ImageUtil imageUtil) {
//        UserDto.ReviewBoardResponse user = new UserDto.ReviewBoardResponse(
//                reviewBoardWish.getUser().getUserId(),
//                reviewBoardWish.getUser().getNickname(),
//                reviewBoardWish.getUser().getProfileImage()
//        );

        UserDto.ReviewBoardResponse user = userMapper.userToReviewBoardResponseDto(reviewBoardWish.getUser(), imageUtil);

        ReviewBoardDto.UserResponse userResponse = ReviewBoardDto.UserResponse.builder()
                .reviewBoardId(reviewBoardWish.getReviewBoard().getReviewBoardId())
                .title(reviewBoardWish.getReviewBoard().getTitle())
                .movieTitle(reviewBoardWish.getReviewBoard().getMovie().getTitle())
                .user(user)
                .build();

        return userResponse;
    }

    default List<ReviewBoardDto.UserResponse> reviewBoardWishToUserResponses(List<ReviewBoardWish> reviewBoardWishes, UserMapper userMapper, ImageUtil imageUtil) {
        List<ReviewBoardDto.UserResponse> userResponses = new ArrayList<>();
        for(ReviewBoardWish reviewBoardWish : reviewBoardWishes) {
            ReviewBoardDto.UserResponse userResponse = reviewBoardWishToUserResponse(reviewBoardWish, userMapper, imageUtil);
            userResponses.add(userResponse);
        }

        return userResponses;
    }
}
