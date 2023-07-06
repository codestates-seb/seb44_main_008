package com.codestates.exception;

import lombok.Getter;

public enum ExceptionCode {

    USER_NOT_FOUND(404, "유저가 존재하지 않습니다"),
    USER_EXISTS(409, "이미 유저가 존재합니다"),
    PASSWORD_INCORRECT(403, "비밀번호가 일치하지 않습니다"),
    INVALID_USER(400, "존재하지않는 유저입니다"),
    REVIEW_BOARD_NOT_FOUND(404, "게시글이 존재하지 않습니다"),
    CANNOT_UPDATE_REVIEW_BOARD(403, "게시글 작성자가 아닙니다"),
    CANNOT_SHOW_REVIEW_BOARD(400, "미성년자는 열람할 수 없는 게시글입니다"),
    ALREADY_WISH_EXIST(409, "이미 찜하기가 되어있습니다"),
    WISH_NOT_FOUND(404, "찜하기가 되어있지 않습니다"),
    COMMENT_NOT_FOUND(404, "댓글이 존재하지 않습니다"),
    CANNOT_UPDATE_COMMENT(403, "댓글 작성자가 아닙니다"),
    MOVIE_NOT_FOUND(404, "영화가 존재하지 않습니다"),
    ALREADY_LIKE_EXIST(409, "이미 좋아요가 되어있습니다"),
    LIKE_NOT_FOUND(404, "좋아요가 되어있지 않습니다");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
