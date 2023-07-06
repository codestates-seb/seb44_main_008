package com.codestates.group.mapper;

import com.codestates.group.dto.MoviePartyDto;
import com.codestates.group.entity.MovieParty;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MoviePartyMapper {
    MovieParty moviePartyPostDtoToMovieParty(MoviePartyDto.Post postDto);
    MovieParty moviePartyPatchDtoToMovieParty(MoviePartyDto.Patch patchDto);
    MoviePartyDto.Response moviePartyToMoviePartyResponseDto(MovieParty group);
    List<MoviePartyDto.Response> moviePartiesToMoviePartyResponseDtos(List<MovieParty> groupList);
}
