import { instance } from '../api';

type TagSearchResultType = {
  data: {
    tagName: string;
    boards: [
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
  };
  pageInfo: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

type KeywordSearchResultType = {
  data: {
    createdAt: string;
    reviewBoardId: number;
    thumbnail: string;
    title: string;
    user: {
      nickname: string;
      userId: number;
    };
  }[];
  pageInfo: {
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
): Promise<KeywordSearchResultType> => {
  return instance
    .get(`/reviewBoards/search?q=${keywordParam}`, {
      params: {
        page: pageParam,
        size: 8,
      },
    })
    .then(res => res.data);
};
