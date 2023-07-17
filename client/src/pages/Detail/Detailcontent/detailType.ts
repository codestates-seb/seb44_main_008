export type DetailData = {
  reviewBoardId?: number;
  title?: string;
  review?: string;
  thumbnail?: string;
  wish?: number;
  wished?: boolean;
  createdAt?: string;
  tags?: { tagId: number; tagName: string }[];
  movie?: Movie;
  user?: User1;
  comments?: Comments[];
  groups?: Group[];
};

interface Movie {
  movieId: number;
  title: string;
}
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
  liked: boolean;
  likes: number;
  createdAt: string;
  user: User1;
}

export interface Group {
  groupId: number;
  title: string;
  location: string;
  meetingDate: string;
  maxCapacity: number;
  currentParticipant: number;
  users: User2[];
}
