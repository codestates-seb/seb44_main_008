package com.codestates.comment.service;

import com.codestates.comment.entity.Comment;
import com.codestates.comment.repository.CommentRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.reviewBoard.service.ReviewBoardService;
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
    private final ReviewBoardService reviewBoardService;

//    public CommentService(CommentRepository commentRepository) {
//        this.commentRepository = commentRepository;
//    }


    public CommentService(CommentRepository commentRepository, ReviewBoardService reviewBoardService) {
        this.commentRepository = commentRepository;
        this.reviewBoardService = reviewBoardService;
    }

    public Comment createComment(long reviewId, Comment comment) {
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(reviewId);
        comment.setReviewBoard(reviewBoard);

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
