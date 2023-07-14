package com.codestates.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

public class ResponseDto {
    @Getter
    @AllArgsConstructor
    public static class SingleResponseDto<T> {
        private T data;
    }

    @Getter
    public static class MultipleResponseDto<T> {
        private List<T> data;
        private PageInfo pageInfo;

        public MultipleResponseDto(List<T> data, Page page) {
            this.data = data;
            this.pageInfo = new PageInfo(page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages());
        }
    }

    @Getter
    public static class MultipleInfoResponseDto<T> {
        private T data;
        private PageInfo pageInfo;

        public MultipleInfoResponseDto(T data, Page page) {
            this.data = data;
            this.pageInfo = new PageInfo(page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages());
        }
    }
}
