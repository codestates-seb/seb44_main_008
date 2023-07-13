import { instance } from '../api';

type ItemType = {
  title: string;
  review: string;
  movieId: number;
  tags: { tagId: number }[];
};

type ReviewType = {
  recommendBoards: {
    reviewBoardId: number;
    title: string;
    thumbnail: string;
    createdAt: string;
    user: {
      userId: number;
      nickname: string;
    };
  }[];
  popularBoards: {
    reviewBoardId: number;
    title: string;
    thumbnail: string;
    createdAt: string;
    user: {
      userId: number;
      nickname: string;
    };
  }[];
  boards: {
    reviewBoardId: number;
    title: string;
    thumbnail: string;
    createdAt: string;
    user: {
      userId: number;
      nickname: string;
    };
  }[];
};

export const getMainItems = (): Promise<ReviewType> =>
  instance.get('/reviewBoards/main').then(res => res.data);

export const postNewReview = (data: ItemType) =>
  instance.post('/reviewBoards', data);

export const editReview = (data: ItemType) => {
  instance.patch('/reviewBoards/{review-id}', data);
};
