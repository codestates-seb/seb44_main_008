package com.codestates.tag.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.repository.TagRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
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

    public List<Tag> getTags() {
        return tagRepository.findAll();
    }

    public Tag findTagById(long tagId) {
        Optional<Tag> optionalTag = tagRepository.findById(tagId);
        Tag findTag =
                optionalTag.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        return findTag;
    }

}
