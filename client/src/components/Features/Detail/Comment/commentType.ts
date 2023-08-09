import { Comments } from '../../../../pages/Detail/Detailcontent/detailType';

export interface commentType {
  reviewId: string;
  data: Comments[];
}

export interface commentListType {
  answer: Comments;
  userId: number;
  reviewId: string;
  commentId: number;
}

export interface commentWriteType {
  reviewId: string;
}
