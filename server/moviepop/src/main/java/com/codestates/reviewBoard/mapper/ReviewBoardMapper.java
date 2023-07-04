package com.codestates.reviewBoard.mapper;

import com.codestates.reviewBoard.dto.ReviewBoardDto;
import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.user.dto.UserDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewBoardMapper {
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
    List<ReviewBoardDto.Response> reviewBoardsToResponses(List<ReviewBoard> reviewBoards);
    ReviewBoardDto.WishResponse reviewBoardToWishResponse(ReviewBoard reviewBoard);
}
