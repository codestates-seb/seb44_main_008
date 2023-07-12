package com.codestates.user.service;

import com.codestates.tag.entity.Tag;
import com.codestates.user.entity.UserTag;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class UserTagService {
    private final UserTagService userTagService;

    public UserTagService(UserTagService userTagService) {
        this.userTagService = userTagService;
    }

    public List<Tag> findTagByUserTag(List<UserTag> userTags) {
        List<Tag> tags = new ArrayList<>();

        for(UserTag findUserTags : userTags) {
            Tag tag = findUserTags.getTag();
            tags.add(tag);
        }

        return tags;
    }
}
