package com.codestates.movie_party.dto;

import com.codestates.user.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class MoviePartyDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        private String title;
        @NotNull
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime meetingDate;
        @NotBlank
        private String location;
        @Positive
        private int maxCapacity;
        @NotBlank
        private String content;
        @NotBlank
        private String movieTitle;
    }

    @Getter
    @Builder
    public static class Patch {
        @Setter
        private long moviePartyId;
        @NotBlank
        private String title;
        @NotNull
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime meetingDate;
        @NotBlank
        private String location;
        @Positive
        private int maxCapacity;
        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long groupId;
        private String title;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime meetingDate;
        private String location;
        private int maxCapacity;
        private String content;
        private String movieTitle;
    }

    @Getter
    @Builder
    public static class EntireResponse {
        private long groupId;
        private String title;
        private String location;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime meetingDate;
        private int maxCapacity;
        private int currentParticipant;
        private List<UserDto.MoviePartyResponse> users;
        // userId, profileImage
    }

    @Getter
    @AllArgsConstructor
    public static class MyPageResponse {
        private long groupId;
        private String title;
        private String location;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime meetingDate;
        private int maxCapacity;
        private int currentParticipant;
        private String movieTitle;
    }

    @Getter
    @AllArgsConstructor
    public static class CurrentParticipantResponse {
        private long groupId;
        private int currentParticipant;
    }
}
