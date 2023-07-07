package com.codestates.reviewBoard.dto;


import com.codestates.tag.dto.TagDto;
import com.codestates.user.dto.UserDto;
import com.codestates.comment.dto.CommentDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class ReviewBoardDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "내용을 채우세요")
        private String title;
        @NotBlank(message = "내용을 채우세요")
        private String review;
        @NotNull
        private Long movieId;
        @Valid
        @NotNull(message = "태그는 필수 입력값입니다.")
        @Size(min = 1, max = 3, message = "태그는 최소 1개에서 최대 3개까지 입력 가능합니다.")
        private List<TagDto.ReviewBoardRequest> tags;
//        private String thumbnail_URL;
    }

    @Getter
    @Setter
    public static  class Patch {

        private long reviewId;

        @NotBlank(message = "내용을 채우세요")
        private String title;
        @NotBlank(message = "내용을 채우세요")
        private String review;
        @Valid
        @NotNull(message = "태그는 필수 입력값입니다.")
        @Size(min = 1, max = 3, message = "태그는 최소 1개에서 최대 3개까지 입력 가능합니다.")
        private List<TagDto.ReviewBoardRequest> tags;

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

        private List<TagDto.response> tags;

        private UserDto.ReviewBoardResponse user;
        //추후 추가
    }

    @Getter
    @AllArgsConstructor
    public static class WishResponse {
        private long reviewBoardId;
        private int wish;
    }

    @Getter
    @Builder
    public static class EntireResponse {
        private long reviewBoardId;
        private String title;
        private String thumbnail;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime createdAt;
    }

    @Getter
    @Builder
    public static class DetailResponse {
        private long reviewBoardId;
        private String title;
        private String review;
        private String thumbnail;
        private int wish;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime createdAt;
        private List<CommentDto.Response> comments;
        private List<TagDto.response> tags;
    }

    @Getter
    @Builder
    public static class MainResponse {
        private List<EntireResponse> popularBoards;
        private List<EntireResponse> boards;
    }
}
