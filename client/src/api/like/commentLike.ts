import { instance } from '../api';
import { likeType } from './likesType';

export const getCommentLike = (commentId: number): Promise<likeType> => {
  return instance.post(`/users/comments/${commentId}`).then(res => res.data);
};

export const deleteCommentLike = (commentId: number): Promise<likeType> => {
  return instance.delete(`/users/comments/${commentId}`).then(res => res.data);
};
