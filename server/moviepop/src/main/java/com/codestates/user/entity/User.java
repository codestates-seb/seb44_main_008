package com.codestates.user.entity;

import com.codestates.audit.Auditable;
import com.codestates.comment.entity.Comment;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.reviewBoard.entity.ReviewBoard;
import com.codestates.utils.CustomBeanUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true, length = 100)
    private String nickname;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false)
    private String profileImage;

    private String birth;

    private float star = 0;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    public enum UserStatus {
        USER_ACTIVE ("활동중인 계정"),
        USER_SLEEP("휴면 계정"),
        USER_WITHDRAW("탈퇴한 계정");

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<UserTag> userTag = new ArrayList<>();
//    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
//    private Group group;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ReviewBoard> reviewBoards = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ReviewBoardWish> reviewBoardWishes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CommentLike> commentLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    public User changeUserInfo(User sourceUser, CustomBeanUtils<User> beanUtils) {
        return beanUtils.copyNonNullProperties(sourceUser, this);
    }

    public static void checkExistEmail (User targetUser) {
        if(targetUser != null) throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    public void addReviewBoard(ReviewBoard reviewBoard) {
        this.reviewBoards.add(reviewBoard);
    }

    public void addReviewBoardWish(ReviewBoardWish reviewBoardWish) {
        this.reviewBoardWishes.add(reviewBoardWish);
    }

    public void addCommentLike(CommentLike commentLike) {
        this.commentLikes.add(commentLike);
    }

    public void deleteReviewBoard(long reviewBoardId) {
        this.reviewBoards.remove(reviewBoardId);
    }

    public void deleteReviewBoardWish(long reviewBoardWishId) {

        this.reviewBoardWishes.remove(reviewBoardWishId);
    }
    public void deleteCommentLike(long commentLikeId) {
        this.commentLikes.remove(commentLikeId);
    }
}
