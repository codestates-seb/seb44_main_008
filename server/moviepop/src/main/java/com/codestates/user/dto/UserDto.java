package com.codestates.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class UserDto {
    @Getter
    @Builder
    public static class Post{
        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String nickname;

        private String profileImage;

        @NotBlank
        private String name;

        @NotNull
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate birth;

//        @NotBlank
//        private String birth;

        @NotBlank
        private String password;

//        @NotBlank
//        private Tag tag;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
        @Setter
        private long userId;
        @NotBlank
        private String nickname;

//        @NotBlank
//        private Tag tag;
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
//        private Tag tag;
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
    public static class MainResponse {
        private long userId;
        private String nickname;
    }
}
