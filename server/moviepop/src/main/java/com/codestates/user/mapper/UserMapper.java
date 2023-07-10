package com.codestates.user.mapper;

import com.codestates.review_board.dto.ReviewBoardDto;
import com.codestates.review_board.mapper.ReviewBoardMapper;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.movie_party.dto.MoviePartyDto;
import com.codestates.movie_party.entity.MovieParty;
import com.codestates.movie_party.mapper.MoviePartyMapper;
import com.codestates.user.dto.UserDto;
import com.codestates.user.dto.UserResponseDto;
import com.codestates.user.entity.User;
import com.codestates.user.entity.UserTag;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    default User userPostDtoToUser(UserDto.Post userPostDto, TagMapper tagMapper) {
        List<UserTag> userTags = tagMapper.usersRequestToUserTags(userPostDto.getTags());

        User user = new User();
        user.setEmail(userPostDto.getEmail());
        user.setNickname(userPostDto.getNickname());
        user.setPassword(userPostDto.getPassword());
        user.setProfileImage(userPostDto.getProfileImage());
        user.setName(userPostDto.getName());
        user.setBirth(userPostDto.getBirth());
        user.setUserTags(userTags);

        return user;
    }
    default User userPatchDtoToUser(UserDto.Patch userPatchDto, TagMapper tagMapper) {
        List<UserTag> userTags = tagMapper.usersRequestToUserTags(userPatchDto.getTags());

        User user = new User();
        user.setUserId(userPatchDto.getUserId());
        user.setNickname(userPatchDto.getNickname());
        user.setProfileImage(userPatchDto.getProfileImage());
        user.setUserTags(userTags);

        return user;
    }
    default UserDto.PatchResponse userToUserPatchDto(User user, TagMapper tagMapper) {
        List<TagDto.UserRequest> requests = tagMapper.userTagsToUserRequest(user.getUserTags());

        UserDto.PatchResponse response = UserDto.PatchResponse.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .profileImage(user.getProfileImage())
                .tags(requests)
                .build();

        return response;
    }
    default List<UserTag> userPatchDtoToUserTags(UserDto.Patch userPatchDto, TagMapper tagMapper) {
        List<UserTag> userTags = tagMapper.usersRequestToUserTags(userPatchDto.getTags());

        return userTags;
    }

    default UserDto.PatchPageResponse userToUserPatchPageResponse(User user, TagMapper tagMapper, List<TagDto.Response> tags) {
        List<TagDto.UserRequest> requests = tagMapper.userTagsToUserRequest(user.getUserTags());

        UserDto.PatchPageResponse response = UserDto.PatchPageResponse.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .tags(tags)
                .myTags(requests)
                .build();

        return response;
    }

    default UserResponseDto userToUserResponseDto(User user, ReviewBoardMapper reviewBoardMapper, TagMapper tagMapper, MoviePartyMapper moviePartyMapper) {
        List<TagDto.UserRequest> userTags = tagMapper.userTagsToUserRequest(user.getUserTags());
        List<ReviewBoardDto.UserResponse> wishBoards = reviewBoardMapper.reviewBoardWishToUserResponses(user.getReviewBoardWishes());
        List<ReviewBoardDto.UserResponse> myBoards = reviewBoardMapper.reviewBoardToUserResponses(user.getReviewBoards());

        List<MoviePartyDto.MyPageResponse> myRecruitingGroup = moviePartyMapper.moviePartiesToMyPageResponses(user.getParties());

        List<MovieParty> participatingGroup = user.getMoviePartyUsers().stream()
                .map(moviePartyUser -> moviePartyUser.getMovieParty())
                .collect(Collectors.toList());
        List<MoviePartyDto.MyPageResponse> myParticipatingGroup = moviePartyMapper.moviePartiesToMyPageResponses(participatingGroup);

//        UserResponseDto response = new UserResponseDto(userToUserBriefResponseDto(user), myRecruitingGroup, myParticipatingGroup);
//
//        return response;

        UserResponseDto response = new UserResponseDto(
                user.getUserId(),
                user.getName(),
                user.getNickname(),
                user.getEmail(),
                user.getProfileImage(),
                userTags,
                myBoards,
                wishBoards,
                myRecruitingGroup,
                myParticipatingGroup);

        return response;
    }
    UserDto.MoviePartyResponse userToMoviePartyResponseDto(User user);
    List<UserDto.MoviePartyResponse> usersToMoviePartyResponseDtos(List<User> users);
    //default UserResponseDto
}