import { instance } from '../api';

type tagType = {
  tags: {
    tagId: number;
    tagName: string;
  }[];
};

export const getAllTags = (): Promise<tagType> => {
  return instance.get('/tags').then(res => res.data.data);
};
