package com.codestates.tag.controller;

import com.codestates.dto.ResponseDto;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.tag.service.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tags")
@Validated
public class TagController {
    private final TagService tagService;
    private final TagMapper tagMapper;

    public TagController(TagService tagService, TagMapper tagMapper) {
        this.tagService = tagService;
        this.tagMapper = tagMapper;
    }

    @GetMapping
    public ResponseEntity getAllTags() {

        return new ResponseEntity<>(new ResponseDto.SingleResponseDto<>(tagMapper.tagsToResponses(tagService.getTags())), HttpStatus.OK);
    }
}
