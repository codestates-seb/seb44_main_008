package com.codestates.movie_party.mapper;

import com.codestates.image.utils.ImageUtil;
import com.codestates.movie_party.dto.MoviePartyDto;
import com.codestates.movie_party.entity.MovieParty;
import com.codestates.user.dto.UserDto;
import com.codestates.user.entity.User;
import com.codestates.user.mapper.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MoviePartyMapper {
    MovieParty moviePartyPostDtoToMovieParty(MoviePartyDto.Post postDto);
    MovieParty moviePartyPatchDtoToMovieParty(MoviePartyDto.Patch patchDto);
    @Mapping(source = "moviePartyId", target = "groupId")
    MoviePartyDto.Response moviePartyToMoviePartyResponseDto(MovieParty movieParty);
    List<MoviePartyDto.Response> moviePartiesToMoviePartyResponseDtos(List<MovieParty> groupList);
    @Mapping(source = "moviePartyId", target = "groupId")
    MoviePartyDto.CurrentParticipantResponse moviePartyToCurrentParticipantResponse(MovieParty movieParty);
    @Mapping(source = "moviePartyId", target = "groupId")
    MoviePartyDto.MyPageResponse moviePartyToMyPageResponse(MovieParty movieParty);
    List<MoviePartyDto.MyPageResponse> moviePartiesToMyPageResponses(List<MovieParty> movieParties);
    default MoviePartyDto.EntireResponse moviePartyToEntireResponseDto(MovieParty movieParty, User user, UserMapper userMapper, ImageUtil imageUtil) {
        List<User> participatingUsers = movieParty.getMoviePartyUsers().stream()
                .map(moviePartyUser -> moviePartyUser.getUser())
                .collect(Collectors.toList());
        List<UserDto.MoviePartyResponse> users = userMapper.usersToMoviePartyResponseDtos(participatingUsers, imageUtil);

        boolean isMyMovieParty = user.getUserId() == movieParty.getUser().getUserId();

        MoviePartyDto.EntireResponse response = MoviePartyDto.EntireResponse.builder()
                .groupId(movieParty.getMoviePartyId())
                .title(movieParty.getTitle())
                .location(movieParty.getLocation())
                .meetingDate(movieParty.getMeetingDate())
                .maxCapacity(movieParty.getMaxCapacity())
                .currentParticipant(movieParty.getCurrentParticipant())
                .users(users)
                .isMyMovieParty(isMyMovieParty)
                .build();

        return response;
    }
//    List<MoviePartyDto.EntireResponse> moviePartiesToEntireResponseDtos(List<MovieParty> movieParties, UserMapper userMapper);
    default List<MoviePartyDto.EntireResponse> moviePartiesToEntireResponseDtos(List<MovieParty> movieParties, User user, UserMapper userMapper, ImageUtil imageUtil) {
        List<MoviePartyDto.EntireResponse> responses = new ArrayList<>();
        for(MovieParty movieParty : movieParties)
            responses.add(moviePartyToEntireResponseDto(movieParty, user, userMapper, imageUtil));

        return responses;
    }
}
