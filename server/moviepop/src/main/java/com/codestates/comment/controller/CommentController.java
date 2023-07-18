package com.codestates.comment.controller;

import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.entity.Comment;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.comment.service.CommentService;
import com.codestates.dto.ResponseDto;
import com.codestates.image.utils.ImageUtil;
import com.codestates.security.interceptor.JwtParseInterceptor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {
    public static final String COMMENT_DEFAULT_URL = "/comments";
    private final CommentService commentService;
    private final CommentMapper mapper;
    private final ImageUtil imageUtil;

    public CommentController(CommentService commentService, CommentMapper mapper, ImageUtil imageUtil) {
        this.commentService = commentService;
        this.mapper = mapper;
        this.imageUtil = imageUtil;
    }

    //    @PostMapping
//    public ResponseEntity postComment(@RequestBody @Valid CommentDto.Post requestBody) {
//        Comment comment = commentService.createComment(mapper.commentPostDtoToComment(requestBody));
//        URI location = UriComponent.createUri(COMMENT_DEFAULT_URL, comment.getCommentId());
//
//        return ResponseEntity.created(location).build();
//    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @RequestBody @Valid CommentDto.Patch requestBody) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        requestBody.setCommentId(commentId);
        Comment comment = commentService.updateComment(email, mapper.commentPatchDtoToComment(requestBody));

        return new ResponseEntity (
                new ResponseDto.SingleResponseDto(mapper.commentToCommentPatchResponseDto(comment)),
                HttpStatus.OK
        );
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId) {
        Comment comment = commentService.findComment(commentId);

        return new ResponseEntity(
                new ResponseDto.SingleResponseDto<>(mapper.commentToCommentResponseDto(comment, imageUtil)),
                HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity getComments(@Positive int page,
                                      @Positive int size) {
        Page<Comment> pageComments = commentService.findComments(page, size);
        List<Comment> comments = pageComments.getContent();

        return new ResponseEntity(
                new ResponseDto.MultipleResponseDto(mapper.commentsToCommentResponseDtos(comments), pageComments),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {
        String email = JwtParseInterceptor.getAuthenticatedUsername();
        commentService.deleteComment(email, commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
