package com.codestates.user.dto;

import com.codestates.movie_party.dto.MoviePartyDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class UserResponseDto {
    private UserDto.Response user;
//    private List<리뷰보드Dto> reviews;
    private List<MoviePartyDto.MyPageResponse> myRecruitingGroup;
    private List<MoviePartyDto.MyPageResponse> myParticipatingGroup;
}
