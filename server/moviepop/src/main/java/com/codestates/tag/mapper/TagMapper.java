package com.codestates.tag.mapper;


import com.codestates.review_board.entity.ReviewBoardTag;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.entity.Tag;
import com.codestates.user.entity.UserTag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {


    TagDto.Response tagToResponse(Tag tag);
    List<TagDto.Response> tagsToResponses(List<Tag> tag);
//    Tag requestToReviewBoardTag(TagDto.ReviewBoardRequest reviewBoardRequest);
//
//    List<Tag> requestsToReviewBoardTags(List<TagDto.ReviewBoardRequest> reviewBoardRequests);

    // List<TagDto.ReviewBoardRequest> -> List<ReviewBoardTag>

    @Mapping(source = "tagId", target = "tag.tagId")
    ReviewBoardTag reviewBoardRequestToReviewBoardTag(TagDto.ReviewBoardRequest request);
    List<ReviewBoardTag> reviewBoardsRequestToReviewBoardTags(List<TagDto.ReviewBoardRequest> requests);

    @Mapping(source = "tagId", target = "tag.tagId")
    UserTag userRequestToUserTag(TagDto.UserRequest request);
    List<UserTag> usersRequestToUserTags(List<TagDto.UserRequest> requests);

    @Mapping(source = "tag.tagId", target = "tagId")
    @Mapping(source = "tag.tagName", target = "tagName")
    TagDto.UserRequest userTagToUserRequest(UserTag userTag);
    List<TagDto.UserRequest> userTagsToUserRequest(List<UserTag> userTags);
}
