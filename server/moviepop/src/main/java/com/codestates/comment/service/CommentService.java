package com.codestates.comment.service;

import com.codestates.comment.entity.Comment;
import com.codestates.comment.repository.CommentRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedCommentId(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);
    }

    public Comment findComment(long commentId) {
        return findVerifiedCommentId(commentId);
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(
                page - 1, size, Sort.by("commentId").descending())
        );
    }

    public void deleteComment(long commentId) {
        verifyCommentId(commentId);
        commentRepository.deleteById(commentId);
    }

    public void verifyCommentId(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    private Comment findVerifiedCommentId(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment comment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return comment;
    }
}
