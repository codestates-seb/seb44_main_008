package com.codestates.user.dto;

import com.codestates.tag.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public class UserDto {
    @Getter
    @Builder
    public static class Post{
        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String nickname;

        @NotBlank
        private String name;

        @NotNull
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate birth;

        @NotBlank
        private String password;

        @NotNull
        private List<TagDto.UserRequest> tags;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
        @Setter
        private String email;
        @NotBlank
        private String nickname;
        @NotNull
        private List<TagDto.UserRequest> tags;
    }

    @Getter
    @AllArgsConstructor
    public static class PatchPassword{
        @NotBlank
        private String currentPassword;

        @NotBlank
        private String newPassword;
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private Long userId;
        private String name;
        private String nickname;
        private String email;
        private String profileImage;
        private List<TagDto.UserRequest> myTags;
    }

    @Getter
    @Builder
    public static class PatchResponse{
        private Long userId;
        private String nickname;
        private String email;
        private String profileImage;
        private List<TagDto.UserRequest> tags;
    }

    @Getter
    @Builder
    public static class PatchPageResponse{  //회원정보 수정 페이지 응답 dto
        private Long userId;
        private String nickname;
        private String profileImage;
        private List<TagDto.Response> tags;
        private List<TagDto.UserRequest> myTags;
    }

    @Getter
    @AllArgsConstructor
    public static class ReviewBoardResponse {
        private long userId;
        private String nickname;
        private String profileImage;
    }

    @Getter
    @AllArgsConstructor
    public static class totalReviewBoardResponse {
        private long userId;
        private String nickname;
    }

    @Getter
    @AllArgsConstructor
    public static class MoviePartyResponse {
        private long userId;
        private String profileImage;
    }
}
