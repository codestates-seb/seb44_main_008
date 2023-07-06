package com.codestates.tag.service;

import com.codestates.tag.repository.TagRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class TagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public void makeInitData(Set<Tag> tagSet) {
        tagRepository.saveAll(tagSet);
    }

    public Set<Tag> findTags() {
        return tagRepository.findAll().stream().collect(Collectors.toSet());
    }
}
