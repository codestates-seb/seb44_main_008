package com.codestates.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponseDto {
    private UserDto.Response user;
//    private List<리뷰보드Dto> reviews;
//    private List<그룹Dto> groups;
}
