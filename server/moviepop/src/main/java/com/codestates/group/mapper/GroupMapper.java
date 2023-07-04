package com.codestates.group.mapper;

import com.codestates.group.dto.GroupDto;
import com.codestates.group.entity.Group;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GroupMapper {
    Group groupPostDtoToGroup(GroupDto.Post postDto);
    Group groupPatchDtoToGroup(GroupDto.Patch patchDto);
    GroupDto.Response groupToGroupResponseDto(Group group);
    List<GroupDto.Response> groupsToGroupResponseDtos(List<Group> groupList);
}
