package com.codestates.tag.mapper;

import com.codestates.reviewBoard.dto.ReviewBoardDto;
import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {

    TagDto.response tagToResponse(Tag tag);
    List<TagDto.response> tagsToResponses(List<Tag> tag);
    Tag requestToReviewBoardTag(TagDto.ReviewBoardRequest reviewBoardRequest);

    List<Tag> requestsToReviewBoardTags(List<TagDto.ReviewBoardRequest> reviewBoardRequests);
}
