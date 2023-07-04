package com.codestates.reviewBoard.mapper;

import com.codestates.reviewBoard.dto.ReviewBoardDto;
import com.codestates.reviewBoard.entity.ReviewBoard;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewBoardMapper {
    ReviewBoard PostToReviewBoard(ReviewBoardDto.Post post);
    ReviewBoard PatchToReviewBoard(ReviewBoardDto.Patch patch);
    ReviewBoardDto.Response reviewBoardToResponse(ReviewBoard reviewBoard);
    List<ReviewBoardDto.Response> reviewBoardsToResponses(List<ReviewBoard> reviewBoards);
}
