package com.codestates.group.mapper;

import com.codestates.group.dto.GroupDto;
import com.codestates.group.entity.MovieParty;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GroupMapper {
    MovieParty groupPostDtoToGroup(GroupDto.Post postDto);
    MovieParty groupPatchDtoToGroup(GroupDto.Patch patchDto);
    GroupDto.Response groupToGroupResponseDto(MovieParty group);
    List<GroupDto.Response> groupsToGroupResponseDtos(List<MovieParty> groupList);
}
