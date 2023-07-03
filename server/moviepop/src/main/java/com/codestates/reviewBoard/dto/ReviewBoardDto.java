package com.codestates.reviewBoard.dto;

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
    @Setter
    public static class Response {
        private long reviewBoardId;
        private String title;
        private String review;
        private int likes;
        private LocalDateTime date;
        //추후 추가
    }
}
