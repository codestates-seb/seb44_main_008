package com.codestates.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class TagDto {

    @Getter
    public static class response {
        private long tagId;
        private String tagName;
    }

    @Getter
    public static class ReviewBoardRequest {
        private long tagId;
    }
}
