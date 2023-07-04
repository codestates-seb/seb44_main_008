package com.codestates.user.mapper;

import com.codestates.user.dto.UserDto;
import com.codestates.user.dto.UserResponseDto;
import com.codestates.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    User userPostDtoToUser(UserDto.Post userPostDto);
    User userPatchDtoToUser(UserDto.Patch userPatchDto);
    UserDto.Response userToUserBriefResponseDto(User user);

    UserResponseDto userToUserResponseDto(User user);

    //default UserResponseDto
}