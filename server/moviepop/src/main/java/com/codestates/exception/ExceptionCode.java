package com.codestates.exception;

import lombok.Getter;

public enum ExceptionCode {
    COMMENT_NOT_FOUND(404, "Comment Not Found"),
    GROUP_NOT_FOUND(404, "Group Not Found");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
