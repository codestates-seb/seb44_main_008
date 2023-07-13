package com.codestates.user.repository;

import com.codestates.tag.entity.Tag;
import com.codestates.user.entity.UserTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTagRepository extends JpaRepository<UserTag, Long> {
//    Tag findByUserTag(UserTag userTag);
}
