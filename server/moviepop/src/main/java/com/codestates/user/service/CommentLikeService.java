package com.codestates.user.service;

import com.codestates.comment.entity.Comment;
import com.codestates.user.entity.CommentLike;
import com.codestates.user.entity.User;
import com.codestates.user.repository.CommentLikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommentLikeService {
    private final CommentLikeRepository commentLikeRepository;

    public CommentLikeService(CommentLikeRepository commentLikeRepository) {
        this.commentLikeRepository = commentLikeRepository;
    }

    CommentLike findByCommentAndUser(Comment comment, User user) {
        return commentLikeRepository.findByCommentAndUser(comment, user);
    }
    boolean existsByCommentAndUser(Comment comment, User user) {
        return commentLikeRepository.existsByCommentAndUser(comment,user);
    }

//    public void deleteCommentLike(long commentLikeId) {
//        commentLikeRepository.deleteById(commentLikeId);
//    }
}
