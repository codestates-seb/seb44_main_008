package com.codestates.movie_party.mapper;

import com.codestates.movie_party.dto.MoviePartyDto;
import com.codestates.movie_party.entity.MovieParty;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MoviePartyMapper {
    MovieParty moviePartyPostDtoToMovieParty(MoviePartyDto.Post postDto);
    MovieParty moviePartyPatchDtoToMovieParty(MoviePartyDto.Patch patchDto);
    MoviePartyDto.Response moviePartyToMoviePartyResponseDto(MovieParty group);
    List<MoviePartyDto.Response> moviePartiesToMoviePartyResponseDtos(List<MovieParty> groupList);
}
