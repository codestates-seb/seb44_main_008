package com.codestates.reviewBoard.mapper;


import com.codestates.reviewBoard.entity.ReviewBoardTag;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.user.dto.UserDto;

import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.reviewBoard.dto.ReviewBoardDto;
import com.codestates.reviewBoard.entity.ReviewBoard;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ReviewBoardMapper {
    default ReviewBoard PostToReviewBoard(ReviewBoardDto.Post post, TagMapper tagMapper) {
        List<ReviewBoardTag> reviewBoardTags = tagMapper.reviewBoardsRequestToReviewBoardTags(post.getTags());

        ReviewBoard reviewBoard = new ReviewBoard();
        reviewBoard.setTitle(post.getTitle());
        reviewBoard.setReview(post.getReview());
        reviewBoard.setReviewBoardTags(reviewBoardTags);

        return reviewBoard;
    }
    default ReviewBoard PatchToReviewBoard(ReviewBoardDto.Patch patch, TagMapper tagMapper) {
        List<ReviewBoardTag> reviewBoardTags = tagMapper.reviewBoardsRequestToReviewBoardTags(patch.getTags());

        ReviewBoard reviewBoard = new ReviewBoard();
        reviewBoard.setReviewBoardId(patch.getReviewId());
        reviewBoard.setTitle(patch.getTitle());
        reviewBoard.setReview(patch.getReview());
        reviewBoard.setReviewBoardTags(reviewBoardTags);

        return reviewBoard;
    }

    default ReviewBoardDto.Response reviewBoardToResponse(ReviewBoard reviewBoard, TagMapper tagMapper) {
        UserDto.ReviewBoardResponse userResponse = new UserDto.ReviewBoardResponse(
                reviewBoard.getUser().getUserId(),
                reviewBoard.getUser().getNickname(),
                reviewBoard.getUser().getProfileImage()
        );

        List<TagDto.response> tagResponse = reviewBoard.getReviewBoardTags().stream()
                .map(reviewBoardTag -> tagMapper.tagToResponse(reviewBoardTag.getTag()))
                .collect(Collectors.toList());



        ReviewBoardDto.Response response = ReviewBoardDto.Response.builder()
                .reviewBoardId(reviewBoard.getReviewBoardId())
                .title(reviewBoard.getTitle())
                .review(reviewBoard.getReview())
                .wish(reviewBoard.getWish())
                .thumbnail(reviewBoard.getThumbnail())
                .createdAt(reviewBoard.getCreatedAt())
                .user(userResponse)
                .tags(tagResponse)
                .build();

        return response;
    }
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
    List<ReviewBoardDto.EntireResponse> reviewBoardsToEntireResponses(List<ReviewBoard> reviewBoards);
    default ReviewBoardDto.DetailResponse reviewBoardToDetailResponse(ReviewBoard reviewBoard, CommentMapper commentMapper, TagMapper tagMapper) {
        List<CommentDto.Response> commentResponse = reviewBoard.getComments().stream()
                .map(comment -> commentMapper.commentToCommentResponseDto(comment))
                .collect(Collectors.toList());

        List<TagDto.response> tagResponse = reviewBoard.getReviewBoardTags().stream()
                .map(reviewBoardTag -> tagMapper.tagToResponse(reviewBoardTag.getTag()))
                .collect(Collectors.toList());

        ReviewBoardDto.DetailResponse detailResponse = ReviewBoardDto.DetailResponse.builder()
                .reviewBoardId(reviewBoard.getReviewBoardId())
                .title(reviewBoard.getTitle())
                .review(reviewBoard.getReview())
                .thumbnail(reviewBoard.getThumbnail())
                .wish(reviewBoard.getWish())
                .createdAt(reviewBoard.getCreatedAt())
                .comments(commentResponse)
                .tags(tagResponse)
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
