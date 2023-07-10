package com.codestates.user.dto;

import com.codestates.review_board.dto.ReviewBoardDto;
import com.codestates.tag.dto.TagDto;
import com.codestates.movie_party.dto.MoviePartyDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class UserResponseDto {
    private Long userId;
    private String name;
    private String nickname;
    private String email;
    private String profileImage;
    private List<TagDto.UserRequest> myTags;
    private List<ReviewBoardDto.UserResponse> myBoard;
    private List<ReviewBoardDto.UserResponse> wishBoard;
    private List<MoviePartyDto.MyPageResponse> myRecruitingGroup;
    private List<MoviePartyDto.MyPageResponse> myParticipatingGroup;
}
