package com.codestates.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class CommentDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        @Setter
        long commentId;
        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class PatchResponse {
        private long commentId;
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long commentId;
        private String content;
        private int likes;
        private String createdAt;
    }
}
