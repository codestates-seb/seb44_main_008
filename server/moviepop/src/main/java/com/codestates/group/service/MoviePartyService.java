package com.codestates.group.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.group.entity.MovieParty;
import com.codestates.group.repository.GroupRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class GroupService {
    private final GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public MovieParty createGroup(MovieParty group) {
        return groupRepository.save(group);
    }

    public MovieParty updateGroup(MovieParty group) {
        MovieParty findGroup = findVerifiedGroupId(group.getGroupId());

        Optional.ofNullable(group.getTitle())
                .ifPresent(title -> findGroup.setTitle(title));
        Optional.ofNullable(group.getMeetingDate())
                .ifPresent(date -> findGroup.setMeetingDate(date));
        Optional.ofNullable(group.getLocation())
                .ifPresent(location -> findGroup.setLocation(location));
        Optional.ofNullable(group.getMaxCapacity())
                .ifPresent(capacity -> findGroup.setMaxCapacity(capacity));
        Optional.ofNullable(group.getContent())
                .ifPresent(content -> findGroup.setContent(content));

        return groupRepository.save(findGroup);
    }

    public MovieParty findGroup(long groupId) {
        return findVerifiedGroupId(groupId);
    }

    public Page<MovieParty> findGroups(int page, int size) {
        return groupRepository.findAll(PageRequest.of(
                page - 1, size, Sort.by("groupId").descending())
        );
    }

    public void deleteGroup(long groupId) {
        verifyGroupId(groupId);
        groupRepository.deleteById(groupId);
    }

    private void verifyGroupId(long groupId) {
        Optional<MovieParty> optionalGroup = groupRepository.findById(groupId);
        optionalGroup.orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));
    }

    private MovieParty findVerifiedGroupId(long groupId) {
        Optional<MovieParty> optionalGroup = groupRepository.findById(groupId);
        MovieParty group = optionalGroup.orElseThrow(() -> new BusinessLogicException(ExceptionCode.GROUP_NOT_FOUND));

        return group;
    }
}
