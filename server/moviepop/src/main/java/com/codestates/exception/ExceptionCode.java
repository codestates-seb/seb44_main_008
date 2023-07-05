package com.codestates.exception;

import lombok.Getter;

public enum ExceptionCode {

    USER_NOT_FOUND(404, "유저가 존재하지않습니다"),
    USER_EXISTS(409, "이미 유저가 존재합니다"),
    PASSWORD_INCORRECT(403, "비밀번호가 일치하지 않습니다"),
    INVALID_USER(400, "존재하지않는 유저입니다"),
    ALREADY_WISH_EXIST(409, "이미 찜하기가 되어있습니다"),
    WISH_NOT_FOUND(404, "찜하기가 되어있지 않습니다"),
    COMMENT_NOT_FOUND(404, "Comment Not Found"),
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
