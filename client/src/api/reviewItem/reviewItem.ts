import axios from 'axios';
import { instance } from '../api';

type PostItemType = {
  post: {
    title: string;
    movieId: number;
    review: string;
    tags: { tagId: number; tagName: string }[];
  };
  thumbnail: File | undefined;
};

type EditItemType = {
  reviewId: string | undefined;
  patch: {
    title: string | undefined;
    review: string;
    tags: Object[];
  };
  thumbnail: File | undefined;
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

export type PageType = {
  data: [
    {
      createdAt: string;
      reviewBoardId: number;
      thumbnail: string;
      title: string;
      user: {
        nickname: string;
        userId: number;
      };
    },
  ];
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

type AllItemType = {
  data: [
    {
      createdAt: string;
      reviewBoardId: number;
      thumbnail: string;
      title: string;
      user: {
        nickname: string;
        userId: number;
      };
    },
  ];
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

export const getMainItems = (): Promise<ReviewType> =>
  instance.get('/reviewBoards/main').then(res => res.data.data);

export const getAllItems = async (pageParam: number): Promise<AllItemType> => {
  return instance
    .get(`/reviewBoards`, {
      params: {
        page: pageParam,
        size: 8,
      },
    })
    .then(res => res.data);
};

export const postNewReview = (data: PostItemType) => {
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

export const getItem = (reviewId: string | undefined) => {
  return instance.get(`/reviewBoards/${reviewId}`).then(res => res.data);
};

export const editReview = (postData: EditItemType) => {
  const formData = new FormData();

  formData.append(
    'patch',
    new Blob([JSON.stringify(postData.patch)], { type: 'application/json' }),
  );
  if (postData.thumbnail) {
    formData.append('thumbnail', postData.thumbnail);
  }

  return axios.patch(
    `${import.meta.env.VITE_BASE_URL}/reviewBoards/${postData.reviewId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('token'),
        Refresh: localStorage.getItem('refreshToken'),
      },
    },
  );
};
