package com.codestates.comment.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

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
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime createdAt;
    }
}
