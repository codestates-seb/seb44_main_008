package com.codestates.user.mapper;

import com.codestates.movie_party.dto.MoviePartyDto;
import com.codestates.movie_party.entity.MovieParty;
import com.codestates.movie_party.mapper.MoviePartyMapper;
import com.codestates.user.dto.UserDto;
import com.codestates.user.dto.UserResponseDto;
import com.codestates.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    User userPostDtoToUser(UserDto.Post userPostDto);
    User userPatchDtoToUser(UserDto.Patch userPatchDto);
    UserDto.Response userToUserBriefResponseDto(User user);

    default UserResponseDto userToUserResponseDto(User user, MoviePartyMapper moviePartyMapper) {
        List<MoviePartyDto.MyPageResponse> myRecruitingGroup = moviePartyMapper.moviePartiesToMyPageResponses(user.getParties());

        List<MovieParty> participatingGroup = user.getMoviePartyUsers().stream()
                .map(moviePartyUser -> moviePartyUser.getMovieParty())
                .collect(Collectors.toList());
        List<MoviePartyDto.MyPageResponse> myParticipatingGroup = moviePartyMapper.moviePartiesToMyPageResponses(participatingGroup);

        UserResponseDto response = new UserResponseDto(userToUserBriefResponseDto(user), myRecruitingGroup, myParticipatingGroup);

        return response;
    }
    UserDto.MoviePartyResponse userToMoviePartyResponseDto(User user);
    List<UserDto.MoviePartyResponse> usersToMoviePartyResponseDtos(List<User> users);
    //default UserResponseDto
}