package com.codestates.comment.service;

import com.codestates.comment.entity.Comment;
import com.codestates.comment.repository.CommentRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.service.ReviewBoardService;
import com.codestates.user.entity.User;
import com.codestates.user.service.CommentLikeService;
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

    public CommentService(CommentRepository commentRepository, ReviewBoardService reviewBoardService) {
        this.commentRepository = commentRepository;
        this.reviewBoardService = reviewBoardService;
    }

    public Comment createComment(long reviewId, User user, Comment comment) {
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(user, reviewId);

        comment.setUser(user);
        comment.setReviewBoard(reviewBoard);

        return commentRepository.save(comment);
    }

    public Comment updateComment(String email, Comment comment) {
        Comment findComment = findVerifiedCommentId(comment.getCommentId());
        if(!findComment.getUser().getEmail().equals(email))
            throw new BusinessLogicException(ExceptionCode.CANNOT_UPDATE_COMMENT);

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

    public void deleteComment(String email, long commentId) {
        Comment comment = findVerifiedCommentId(commentId);
        if(!comment.getUser().getEmail().equals(email))
            throw new BusinessLogicException(ExceptionCode.CANNOT_UPDATE_COMMENT);

//        comment.getCommentLikes().clear();

        // 나중에 확인(지웠을 때 잘 동작하는지)
        ReviewBoard reviewBoard = comment.getReviewBoard();
        reviewBoard.getComments().remove(comment);

        User user = comment.getUser();
        user.getComments().remove(comment);

        commentRepository.deleteById(commentId);
    }

    private Comment findVerifiedCommentId(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment comment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return comment;
    }
}
