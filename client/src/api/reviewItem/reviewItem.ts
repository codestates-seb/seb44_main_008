import axios from 'axios';
import { instance } from '../api';

type ItemType = {
  post: {
    title: string;
    review: string;
    movieId: number;
    tags: { tagId: number }[];
  };
  thumbnail?: string | undefined;
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

type AllItemType = {
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
  pageInfo?: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

export const getMainItems = (): Promise<ReviewType> =>
  instance.get('/reviewBoards/main').then(res => res.data);

export const getAllItems = (): Promise<AllItemType> => {
  return instance.get('/reviewBoards?page=1&size=16').then(res => res.data);
};

export const postNewReview = (data: ItemType) => {
  const formData = new FormData();

  formData.append(
    'post',
    new Blob([JSON.stringify(data.post)], { type: 'application/json' }),
  );
  if (data.thumbnail) {
    formData.append('thumbnail', data.thumbnail);
  }

  return axios.post(`${import.meta.env.VITE_BASE_URL}/reviewBoards`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem('token'),
      Refresh: localStorage.getItem('refreshToken'),
    },
  });
};

export const editReview = (data: ItemType) => {
  instance.patch('/reviewBoards/{review-id}', data);
};
