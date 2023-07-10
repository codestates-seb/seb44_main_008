//package com.codestates.comment.controller;
//
//import com.codestates.comment.dto.CommentDto;
//import com.codestates.comment.entity.Comment;
//import com.codestates.comment.mapper.CommentMapper;
//import com.codestates.comment.service.CommentService;
//import com.google.gson.Gson;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
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
//import static org.hamcrest.Matchers.hasSize;
//import static org.hamcrest.Matchers.startsWith;
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.doNothing;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@WebMvcTest(CommentController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureWebMvc
//class CommentControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private CommentService commentService;
//    @MockBean
//    private CommentMapper commentMapper;
//
//    @Test
//    public void postCommentTest() throws Exception {
//        CommentDto.Post postDto = new CommentDto.Post("고양이의 보은!");
//        String content = gson.toJson(postDto);
//
//        Comment response = new Comment();
//        response.setCommentId(1L);
//
//        given(commentMapper.commentPostDtoToComment(Mockito.any(CommentDto.Post.class))).willReturn(new Comment());
//        given(commentService.createComment(anyLong(), Mockito.any(Comment.class))).willReturn(response);
//
//        ResultActions actions = mockMvc.perform(
//                post("/comments")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content)
//        );
//
//        actions.andExpect(status().isCreated())
//                .andExpect(header().string("Location", startsWith("/comments/")));
//    }
//
//    @Test
//    public void patchCommentTest() throws Exception {
//        long commentId = 1L;
//        CommentDto.Patch patchDto = new CommentDto.Patch(commentId, "고양이의 보은2!");
//        String content = gson.toJson(patchDto);
//
//        CommentDto.PatchResponse responseDto = new CommentDto.PatchResponse(commentId, patchDto.getContent());
//
//        given(commentMapper.commentPatchDtoToComment(Mockito.any(CommentDto.Patch.class))).willReturn(new Comment());
//        given(commentService.updateComment(Mockito.any(Comment.class))).willReturn(new Comment());
//        given(commentMapper.commentToCommentPatchResponseDto(Mockito.any(Comment.class))).willReturn(responseDto);
//
//        ResultActions actions = mockMvc.perform(
//                patch("/comments/{comment-id}", commentId)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content)
//        );
//
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.commentId").value(commentId))
//                .andExpect(jsonPath("$.data.content").value(patchDto.getContent()));
//    }
//
//    @Test
//    public void getCommentTest() throws Exception {
//        long commentId = 1L;
//
//        CommentDto.Response response = new CommentDto.Response(commentId, "고양이의 보은...", 23, LocalDateTime.of(2023, 06, 30, 20, 0, 0));
//
//        given(commentService.findComment(anyLong())).willReturn(new Comment());
//        given(commentMapper.commentToCommentResponseDto(Mockito.any(Comment.class))).willReturn(response);
//
//
//        ResultActions actions = mockMvc.perform(
//                get("/comments/{comment-id}", commentId)
//                        .accept(MediaType.APPLICATION_JSON)
//        );
//
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.commentId").value(commentId));
//    }
//
//    @Test
//    public void getCommentsTest() throws Exception {
//        List<Comment> commentList = getCommentList();
//
//        int page = 2, size = 6;
//        List<Comment> subList = commentList.subList(size, commentList.size());
//        Page<Comment> pageComments = getPageCommentList(page, size, commentList.size(), subList);
//        List<CommentDto.Response> responses = getSubCommentResponseList(subList);
//
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("page", String.valueOf(page));
//        params.add("size", String.valueOf(size));
//
//        given(commentService.findComments(anyInt(), anyInt())).willReturn(pageComments);
//        given(commentMapper.commentsToCommentResponseDtos(anyList())).willReturn(responses);
//
//        ResultActions actions = mockMvc.perform(
//                get("/comments")
//                        .params(params)
//                        .accept(MediaType.APPLICATION_JSON)
//        );
//
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").isNotEmpty())
//                .andExpect(jsonPath("$.data").isArray())
//                .andExpect(jsonPath("$.data", hasSize(commentList.size() - size)));
//
//        for(int idx = 0; idx < responses.size(); idx++) {
//            actions.andExpect(jsonPath("$.data[" + idx + "].commentId").value(responses.get(idx).getCommentId()))
//                    .andExpect(jsonPath("$.data[" + idx + "].content").value(responses.get(idx).getContent()))
//                    .andExpect(jsonPath("$.data[" + idx + "].likes").value(responses.get(idx).getLikes()))
//                    .andExpect(jsonPath("$.data[" + idx + "].createdAt").value(responses.get(idx).getCreatedAt()));
//        }
//
//        page = 1;
//        subList = commentList.subList(0, size);
//        pageComments = getPageCommentList(page, size, commentList.size(), subList);
//        responses = getSubCommentResponseList(subList);
//
//        params = new LinkedMultiValueMap<>();
//        params.add("page", String.valueOf(page));
//        params.add("size", String.valueOf(size));
//
//        given(commentService.findComments(anyInt(), anyInt())).willReturn(pageComments);
//        given(commentMapper.commentsToCommentResponseDtos(anyList())).willReturn(responses);
//
//        actions = mockMvc.perform(
//                get("/comments")
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
//            actions.andExpect(jsonPath("$.data[" + idx + "].commentId").value(responses.get(idx).getCommentId()))
//                    .andExpect(jsonPath("$.data[" + idx + "].content").value(responses.get(idx).getContent()))
//                    .andExpect(jsonPath("$.data[" + idx + "].likes").value(responses.get(idx).getLikes()))
//                    .andExpect(jsonPath("$.data[" + idx + "].createdAt").value(responses.get(idx).getCreatedAt()));
//        }
//    }
//
//    private Page<Comment> getPageCommentList(int page, int size, int total, List<Comment> subList) {
//        return new PageImpl<>(subList, PageRequest.of(page - 1, size, Sort.by("commentId").descending()), total);
//    }
//
//    private List<CommentDto.Response> getSubCommentResponseList(List<Comment> subList) {
//        List<CommentDto.Response> responses = new ArrayList<>();
//
//        for(int idx = 0; idx < subList.size(); idx++) {
//            Comment comment = subList.get(idx);
//            CommentDto.Response response = new CommentDto.Response(comment.getCommentId(), comment.getContent(), comment.getLikes(), LocalDateTime.of(2023, 06, 30, 20, 0, 0));
//
//            responses.add(response);
//        }
//
//        return responses;
//    }
//
//    private List<Comment> getCommentList() {
//        List<Comment> comments = new ArrayList<>();
//        for(int idx = 10; idx > 0; idx--) {
//            Comment comment = new Comment();
//            comment.setCommentId((long)idx);
//            comment.setContent("고양이의 보은!" + idx);
//            comment.setLikes(idx);
//
//            comments.add(comment);
//        }
//
//        return comments;
//    }
//
//    @Test
//    public void deleteCommentTest() throws Exception {
//        long commentId = 1L;
//
//        doNothing().when(commentService).deleteComment(anyLong());
//
//        ResultActions actions = mockMvc.perform(
//                delete("/comments/{comment-id}", commentId)
//        );
//
//        actions.andExpect(status().isNoContent());
//    }
//}