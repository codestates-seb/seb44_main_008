//댓글 등록, 수정, 특정 댓글 조회, 댓글 전체 조회, 댓글삭제
import { instance } from '../api';

interface data {
  commentId: number;
  content: string;
}

interface CommentData extends data {
  like: number;
  createdAt: string;
  user: {
    userId: number;
    nickname: string;
  };
}

interface CommentDatas {
  comments: {
    commentId: number;
    content: string;
    like: number;
    createdAt: string;
    user: {
      userId: number;
      nickname: string;
      profileImage: string;
    };
  }[];
}

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
