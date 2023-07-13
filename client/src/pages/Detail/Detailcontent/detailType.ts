export type DetailData = {
  reviewBoardId?: number;
  title?: string;
  review?: string;
  thumbnail?: string;
  wish?: number;
  isWish?: boolean;
  createdAt?: string;
  tags?: { tagId: number; tagName: string }[];
  user?: User1;
  comments?: Comments[];
  groups?: Group[];
};

interface User1 {
  userId: number;
  nickname: string;
  profileImage: string;
}

interface User2 {
  userId: number;
  profileImage: string;
}

export interface Comments {
  commentId: number;
  content: string;
  like: number;
  createdAt: string;
  user: User1;
}

export interface Group {
  groupId: number;
  title: string;
  location: string;
  date: string;
  max: number;
  current: number;
  users: User2[];
}
