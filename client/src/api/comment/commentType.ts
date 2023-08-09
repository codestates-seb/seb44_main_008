export interface data {
  commentId: number;
  content: string;
}

export interface CommentData extends data {
  like: number;
  createdAt: string;
  user: {
    userId: number;
    nickname: string;
  };
}

export interface CommentDatas {
  comments: {
    commentId: number;
    content: string;
    like: number;
    createdAt: string;
    user: {
      userId: number;
      nickname: string;
      profileImage: string;
    };
  }[];
}
