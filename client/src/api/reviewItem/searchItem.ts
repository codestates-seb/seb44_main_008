import { instance } from '../api';

type TagSearchResultType = {
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

type KeywordSearchResultType = {
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

export const getTagSearchItems = async (
  pageParam: number,
  tagIdParam: string | undefined,
): Promise<TagSearchResultType> => {
  return instance
    .get(`/reviewBoards/tags/${tagIdParam}`, {
      params: {
        page: pageParam,
        size: 8,
      },
    })
    .then(res => res.data);
};

export const getKeywordSearchItems = async (
  pageParam: number,
  keywordParam: string | undefined,
): Promise<TagSearchResultType> => {
  return instance
    .get(`/reviewBoards/search?q=${keywordParam}`, {
      params: {
        page: pageParam,
        size: 8,
      },
    })
    .then(res => res.data);
};
