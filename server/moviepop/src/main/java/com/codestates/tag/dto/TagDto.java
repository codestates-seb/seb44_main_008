package com.codestates.tag.dto;

import lombok.Getter;
import lombok.Setter;

public class TagDto {

    @Getter
    @Setter
    public static class Response {
        private long tagId;
        private String tagName;
    }

    @Getter
    @Setter
    public static class ReviewBoardRequest {
        private long tagId;
    }
    @Getter
    @Setter
    public static class UserRequest {
        private long tagId;
        private String tagName;
    }
}
