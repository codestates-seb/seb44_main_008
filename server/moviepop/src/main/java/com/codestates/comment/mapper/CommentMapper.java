package com.codestates.comment.mapper;

import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.entity.Comment;
import com.codestates.user.dto.UserDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.Post postDto);
    Comment commentPatchDtoToComment(CommentDto.Patch patchDto);
    CommentDto.PatchResponse commentToCommentPatchResponseDto(Comment comment);
    default CommentDto.Response commentToCommentResponseDto(Comment comment) {
        UserDto.ReviewBoardResponse userResponse = new UserDto.ReviewBoardResponse(comment.getUser().getUserId(), comment.getUser().getNickname(), comment.getUser().getProfileImage());
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
    CommentDto.likeResponse commentToCommentLikeResponse(Comment comment);
}
