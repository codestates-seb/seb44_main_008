import { instance } from '../api';
import { KeywordSearchResultType, TagSearchResultType } from './itemsType';

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
