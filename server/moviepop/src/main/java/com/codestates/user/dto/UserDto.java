package com.codestates.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String nickname;

        private String profileImage;

        @NotBlank
        private String name;

        @NotBlank
        private String birth;

        @NotBlank
        private String password;

//        @NotBlank
//        private Tag tag;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
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
        private String username;
        private String profileImage;
    }
}
