package com.codestates.user.repository;

import com.codestates.comment.entity.Comment;
import com.codestates.user.entity.CommentLike;
import com.codestates.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    CommentLike findByCommentAndUser(Comment comment, User user);
    boolean existsByCommentAndUser(Comment comment, User user);
}
