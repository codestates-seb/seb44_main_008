export interface postsType {
  reviewBoardId: number;
  title: string;
  movieTitle: string;
  user: {
    nickname: string;
    profileImage: string;
  };
}

export interface tabAType {
  data: {
    reviewBoardId: number;
    title: string;
    movieTitle: string;
    liked: boolean;
    user: {
      userId: number;
      nickname: string;
      profileImage: string;
    };
  }[];
}

export interface tabBType {
  data: {
    reviewBoardId: number;
    title: string;
    movieTitle: string;
    user: {
      userId: number;
      nickname: string;
      profileImage: string;
    };
  }[];
}

export interface tabCType {
  data2: {
    groupId: number;
    title: string;
    location: string;
    maxCapacity: number;
    currentParticipant: number;
    meetingDate: string;
    movieTitle: string;
  }[];
}

export interface tabDType {
  data2: {
    groupId: number;
    title: string;
    location: string;
    maxCapacity: number;
    currentParticipant: number;
    meetingDate: string;
    movieTitle: string;
  }[];
}
