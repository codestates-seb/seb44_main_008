package com.codestates.reviewBoard.dto;

import com.codestates.user.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class ReviewBoardDto {

    @Getter
    @Setter
    public static class Post {
        @NotBlank(message = "내용을 채우세요")
        private String title;
        @NotBlank(message = "내용을 채우세요")
        private String movieTitle;
        @NotBlank(message = "내용을 채우세요")
        private String review;

//        private List<String> tags;
//        private String thumbnail_URL;
    }

    @Getter
    @Setter
    public static  class Patch {
        private long reviewBoardId;
        @NotBlank(message = "내용을 채우세요")
        private String title;
        @NotBlank(message = "내용을 채우세요")
        private String movieTitle;
        @NotBlank(message = "내용을 채우세요")
        private String review;

//        private List<String> tags;
//        private String thumbnail_URL;
    }

    @Getter
    @Builder
    public static class Response {
        private long reviewBoardId;
        private String title;
        private String review;
        private int wish;
        private String thumbnail;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime createdAt;

        private UserDto.ReviewBoardResponse user;
        //추후 추가
    }

    public static class WishResponse {
        private long reviewBoarId;
        private long likes;
    }
}