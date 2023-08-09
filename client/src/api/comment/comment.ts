//댓글 등록, 수정, 특정 댓글 조회, 댓글 전체 조회, 댓글삭제
import { instance } from '../api';
import { CommentData, CommentDatas, data } from './commentType';

export const PostComment = (
  reviewId: string | number | undefined,
  content: string,
) => {
  return instance.post(`/reviewBoards/${reviewId}/comments`, content);
};

export const PatchComment = (commentId: number | undefined): Promise<data> => {
  return instance.patch(`/comments/${commentId}`).then(res => res.data);
};

export const GetCommentItem = (
  commentId: number | undefined,
): Promise<CommentData> => {
  return instance
    .get(`/reviewBoards/${commentId}/comments`)
    .then(res => res.data);
};

export const GetCommentAll = (
  page?: number,
  size?: number,
): Promise<CommentDatas> => {
  return instance
    .get(`/comments?page=${page}&size=${size}`)
    .then(res => res.data);
};

export const DeleteComment = (commentId: number) => {
  return instance.delete(`/comments/${commentId}`).then(res => res.data);
};
