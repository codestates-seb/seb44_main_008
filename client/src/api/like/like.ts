import { instance } from '../api';

type likeType = {
  reviewBoardId: number;
  wish: number;
};

export const getLike = (reviewId: number): Promise<likeType> => {
  return instance.post(`/users/reviewBoards/${reviewId}`).then(res => res.data);
};

export const deleteLike = (reviewId: number): Promise<likeType> => {
  return instance
    .delete(`/users/reviewBoards/${reviewId}`)
    .then(res => res.data);
};
