import { instance } from '../api';

type likeType = {
  commentId: number;
  likes: number;
};

export const getCommentLike = (commentId: number): Promise<likeType> => {
  return instance.post(`/users/comments/${commentId}`).then(res => res.data);
};

export const deleteCommentLike = (commentId: number): Promise<likeType> => {
  return instance.delete(`/users/comments/${commentId}`).then(res => res.data);
};
