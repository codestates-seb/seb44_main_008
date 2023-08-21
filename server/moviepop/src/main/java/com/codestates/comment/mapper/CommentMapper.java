package com.codestates.comment.mapper;

import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.entity.Comment;
import com.codestates.image.utils.ImageUtil;
import com.codestates.user.dto.UserDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.Post postDto);
    Comment commentPatchDtoToComment(CommentDto.Patch patchDto);
    CommentDto.CommentUpdateResponse commentToCommentPatchResponseDto(Comment comment);
    default CommentDto.Response commentToCommentResponseDto(Comment comment, ImageUtil imageUtil) {
        String profileImage = comment.getUser().getProfileImage();
        if(profileImage == null) profileImage = imageUtil.getUrl() + imageUtil.getDefaultProfileImage();
        else profileImage = imageUtil.getUrl() + profileImage;

        UserDto.ReviewBoardResponse userResponse = new UserDto.ReviewBoardResponse(comment.getUser().getUserId(), comment.getUser().getNickname(), profileImage);
        CommentDto.Response response = CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .likes(comment.getLikes())
                .liked(false)
                .createdAt(comment.getCreatedAt())
                .user(userResponse)
                .build();
        return response;
    }
    List<CommentDto.Response> commentsToCommentResponseDtos(List<Comment> comments);
    CommentDto.LikeResponse commentToCommentLikeResponse(Comment comment);
}
