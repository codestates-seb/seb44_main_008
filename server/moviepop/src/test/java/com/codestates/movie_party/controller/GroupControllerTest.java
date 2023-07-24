//package com.codestates.group.controller;
//
//import com.codestates.group.dto.MoviePartyDto;
//import com.codestates.group.entity.MovieParty;
//import com.codestates.group.mapper.MoviePartyMapper;
//import com.codestates.group.service.MoviePartyService;
//import com.google.gson.Gson;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.hamcrest.Matchers.*;
//import static org.hamcrest.Matchers.startsWith;
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.doNothing;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@WebMvcTest(MoviePartyController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureWebMvc
//class GroupControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private MoviePartyService groupService;
//    @MockBean
//    private MoviePartyMapper groupMapper;
//
//    @Test
//    public void postGroupTest() throws Exception {
//        MoviePartyDto.Post postDto = new MoviePartyDto.Post("맥주 한 캔 들고 같이 봐요!", LocalDateTime.of(2023, 6, 30, 20, 0), "watcha party", 5, "팟 소개글");
//        String content = "{\"title\":\"맥주 한 캔 들고 같이 봐요!\",\"meetingDate\":\"2023-06-30T20:00\",\"location\":\"watcha party\",\"maxCapacity\":5,\"content\":\"팟 소개글\"}";
//
//        MovieParty group = new MovieParty();
//        group.setGroupId(1L);
//
//        given(groupMapper.groupPostDtoToGroup(Mockito.any(MoviePartyDto.Post.class))).willReturn(new MovieParty());
//        given(groupService.createGroup(Mockito.any(MovieParty.class))).willReturn(group);
//
//        ResultActions actions = mockMvc.perform(
//                post("/groups")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content)
//        );
//
//        actions.andExpect(status().isCreated())
//                .andExpect(header().string("Location", startsWith("/groups/")));
//    }
//
//    @Test
//    public void patchGroupTest() throws Exception {
//        long groupId = 1L;
//        MoviePartyDto.Patch patchDto = MoviePartyDto.Patch.builder()
//                .title("맥주 두 캔 들고 같이 봐요!")
//                .meetingDate(LocalDateTime.of(2023, 6, 30, 20, 0))
//                .location("Watcha Party")
//                .maxCapacity(5)
//                .content("안녕하세요! 영화를 좋아하는...")
//                .build();
//        String content = "{\"groupId\":0,\"title\":\"맥주 두 캔 들고 같이 봐요!\",\"meetingDate\":\"2023-06-30T20:00\",\"location\":\"Watcha Party\",\"maxCapacity\":5,\"content\":\"안녕하세요! 영화를 좋아하는...\"}";
//
//        MoviePartyDto.Response response = new MoviePartyDto.Response(groupId, patchDto.getTitle(), patchDto.getMeetingDate(), patchDto.getLocation(), patchDto.getMaxCapacity(), patchDto.getContent());
//
//        given(groupMapper.groupPatchDtoToGroup(Mockito.any(MoviePartyDto.Patch.class))).willReturn(new MovieParty());
//        given(groupService.updateGroup(Mockito.any(MovieParty.class))).willReturn(new MovieParty());
//        given(groupMapper.groupToGroupResponseDto(Mockito.any(MovieParty.class))).willReturn(response);
//
//        ResultActions actions = mockMvc.perform(
//                patch("/groups/{group-id}", groupId)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content)
//        );
//
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.groupId").value(groupId))
//                .andExpect(jsonPath("$.data.title").value(response.getTitle()))
//                .andExpect(jsonPath("$.data.meetingDate").value(response.getMeetingDate().toString()))
//                .andExpect(jsonPath("$.data.location").value(response.getLocation()))
//                .andExpect(jsonPath("$.data.maxCapacity").value(response.getMaxCapacity()))
//                .andExpect(jsonPath("$.data.content").value(response.getContent()));
//    }
//
//    @Test
//    public void getGroupTest() throws Exception {
//        long groupId = 1L;
//
//        MoviePartyDto.Response response = new MoviePartyDto.Response(groupId, "맥주 한 캔 들고 같이 봐요!", LocalDateTime.of(2023, 6, 30, 20, 0), "watcha party", 5, "팟 소개글");
//
//        given(groupService.findGroup(anyLong())).willReturn(new MovieParty());
//        given(groupMapper.groupToGroupResponseDto(Mockito.any(MovieParty.class))).willReturn(response);
//
//        ResultActions actions = mockMvc.perform(
//                get("/groups/{group-id}", groupId)
//                        .accept(MediaType.APPLICATION_JSON)
//        );
//
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.groupId").value(groupId));
//    }
//
//    @Test
//    public void getGroupsTest() throws Exception {
//        List<MovieParty> groupList = getGroupList();
//
//        int page = 2, size = 6;
//        List<MovieParty> subList = groupList.subList(size, groupList.size());
//        Page<MovieParty> pageGroups = getPageGroupList(page, size, groupList.size(), subList);
//        List<MoviePartyDto.Response> responses = getSubGroupResponseList(subList);
//
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("page", String.valueOf(page));
//        params.add("size", String.valueOf(size));
//
//        given(groupService.findGroups(anyInt(), anyInt())).willReturn(pageGroups);
//        given(groupMapper.groupsToGroupResponseDtos(anyList())).willReturn(responses);
//
//        ResultActions actions = mockMvc.perform(
//                get("/groups")
//                        .params(params)
//                        .accept(MediaType.APPLICATION_JSON)
//        );
//
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").isNotEmpty())
//                .andExpect(jsonPath("$.data").isArray())
//                .andExpect(jsonPath("$.data", hasSize(groupList.size() - size)));
//
//        for(int idx = 0; idx < responses.size(); idx++) {
//            actions.andExpect(jsonPath("$.data[" + idx + "].groupId").value(responses.get(idx).getGroupId()))
//                    .andExpect(jsonPath("$.data[" + idx + "].title").value(responses.get(idx).getTitle()))
//                    .andExpect(jsonPath("$.data[" + idx + "].meetingDate").value(responses.get(idx).getMeetingDate().toString()))
//                    .andExpect(jsonPath("$.data[" + idx + "].location").value(responses.get(idx).getLocation()))
//                    .andExpect(jsonPath("$.data[" + idx + "].maxCapacity").value(responses.get(idx).getMaxCapacity()))
//                    .andExpect(jsonPath("$.data[" + idx + "].content").value(responses.get(idx).getContent()));
//        }
//
//        page = 1;
//        subList = groupList.subList(0, size);
//        pageGroups = getPageGroupList(page, size, groupList.size(), subList);
//        responses = getSubGroupResponseList(subList);
//
//        params = new LinkedMultiValueMap<>();
//        params.add("page", String.valueOf(page));
//        params.add("size", String.valueOf(size));
//
//        given(groupService.findGroups(anyInt(), anyInt())).willReturn(pageGroups);
//        given(groupMapper.groupsToGroupResponseDtos(anyList())).willReturn(responses);
//
//        actions = mockMvc.perform(
//                get("/groups")
//                        .params(params)
//                        .accept(MediaType.APPLICATION_JSON)
//        );
//
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").isNotEmpty())
//                .andExpect(jsonPath("$.data").isArray())
//                .andExpect(jsonPath("$.data", hasSize(size)));
//
//        for(int idx = 0; idx < responses.size(); idx++) {
//            actions.andExpect(jsonPath("$.data[" + idx + "].groupId").value(responses.get(idx).getGroupId()))
//                    .andExpect(jsonPath("$.data[" + idx + "].title").value(responses.get(idx).getTitle()))
//                    .andExpect(jsonPath("$.data[" + idx + "].meetingDate").value(responses.get(idx).getMeetingDate().toString()))
//                    .andExpect(jsonPath("$.data[" + idx + "].location").value(responses.get(idx).getLocation()))
//                    .andExpect(jsonPath("$.data[" + idx + "].maxCapacity").value(responses.get(idx).getMaxCapacity()))
//                    .andExpect(jsonPath("$.data[" + idx + "].content").value(responses.get(idx).getContent()));
//        }
//    }
//
//    private Page<MovieParty> getPageGroupList(int page, int size, int total, List<MovieParty> subList) {
//        return new PageImpl<>(subList, PageRequest.of(page - 1, size, Sort.by("groupId").descending()), total);
//    }
//
//    private List<MoviePartyDto.Response> getSubGroupResponseList(List<MovieParty> subList) {
//        List<MoviePartyDto.Response> responses = new ArrayList<>();
//
//        for(int idx = 0; idx < subList.size(); idx++) {
//            MovieParty group = subList.get(idx);
//            MoviePartyDto.Response response = new MoviePartyDto.Response(
//                    group.getGroupId(),
//                    group.getTitle(),
//                    LocalDateTime.of(2023, 6, 30, 20, 0),
//                    group.getLocation(),
//                    group.getMaxCapacity(),
//                    group.getContent()
//            );
//
//            responses.add(response);
//        }
//
//        return responses;
//    }
//
//    private List<MovieParty> getGroupList() {
//        List<MovieParty> groups = new ArrayList<>();
//        for(int idx = 10; idx > 0; idx--) {
//            MovieParty group = new MovieParty();
//            group.setGroupId((long)idx);
//            group.setTitle("맥주 " + idx + "캔 들고 같이 봐요!");
//            group.setMeetingDate(LocalDateTime.of(2023, 6, 30, 20, 0 ,0));
//            group.setLocation("Watcha");
//            group.setMaxCapacity(idx);
//            group.setContent("팟 소개글" + idx);
//
//            groups.add(group);
//        }
//
//        return groups;
//    }
//
//    @Test
//    public void deleteGroupTest() throws Exception {
//        long groupId = 1L;
//
//        doNothing().when(groupService).deleteGroup(anyLong());
//
//        ResultActions actions = mockMvc.perform(
//                delete("/groups/{group-id}", groupId)
//        );
//
//        actions.andExpect(status().isNoContent());
//    }
//}