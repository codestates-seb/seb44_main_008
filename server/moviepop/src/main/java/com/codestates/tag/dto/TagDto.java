package com.codestates.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class TagDto {

    @Getter
    @Setter
    public static class response {
        private long tagId;
        private String tagName;
    }

    @Getter
    @Setter
    public static class ReviewBoardRequest {
        private long tagId;
    }
}
