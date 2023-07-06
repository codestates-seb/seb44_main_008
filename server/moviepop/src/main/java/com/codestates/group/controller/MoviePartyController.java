package com.codestates.group.controller;

import com.codestates.dto.ResponseDto;
import com.codestates.group.dto.GroupDto;
import com.codestates.group.entity.MovieParty;
import com.codestates.group.mapper.GroupMapper;
import com.codestates.group.service.GroupService;
import com.codestates.utils.UriComponent;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/groups")
@Validated
public class GroupController {
    private final String GROUP_DEFAULT_URI = "/groups";
    private final GroupService groupService;
    private final GroupMapper mapper;

    public GroupController(GroupService groupService, GroupMapper mapper) {
        this.groupService = groupService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postGroup(@RequestBody @Valid GroupDto.Post requestBody) {
        MovieParty group = groupService.createGroup(mapper.groupPostDtoToGroup(requestBody));

        URI location = UriComponent.createUri(GROUP_DEFAULT_URI, group.getGroupId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{group-id}")
    public ResponseEntity patchGroup(@PathVariable("group-id") @Positive long groupId,
                                     @RequestBody @Valid GroupDto.Patch requestBody) {
        requestBody.setGroupId(groupId);
        MovieParty group = groupService.updateGroup(mapper.groupPatchDtoToGroup(requestBody));

        return new ResponseEntity(
                new ResponseDto.SingleResponseDto(mapper.groupToGroupResponseDto(group)),
                HttpStatus.OK
        );
    }

    @GetMapping("/{group-id}")
    public ResponseEntity getGroup(@PathVariable("group-id") @Positive long groupId) {
        MovieParty group = groupService.findGroup(groupId);

        return new ResponseEntity(
                new ResponseDto.SingleResponseDto(mapper.groupToGroupResponseDto(group)),
                HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity getGroups(@Positive int page,
                                    @Positive int size) {
        Page<MovieParty> pageGroups = groupService.findGroups(page, size);
        List<MovieParty> groups = pageGroups.getContent();

        return new ResponseEntity(
                new ResponseDto.MultipleResponseDto<>(mapper.groupsToGroupResponseDtos(groups), pageGroups),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{group-id}")
    public ResponseEntity deleteGroup(@PathVariable("group-id") @Positive long groupId) {
        groupService.deleteGroup(groupId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
