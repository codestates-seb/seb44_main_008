export interface EditUserType {
  userPatchDto: {
    nickname: string | undefined;
    tags: { tagId: number }[];
  };
  profileImage: File | null | undefined;
}
export interface EditPasswordType {
  currentPw: string;
  newPw: string;
}

export interface UserType {
  data: any;
  userId: number;
  name: string;
  nickname: string;
  email: string;
  profileImage: string;
  myTags: {
    tagId: number;
    tagName: string;
  }[];
  wishedBoard: {
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
  myBoard: {
    reviewBoardId: number;
    title: string;
    movieTitle: string;
    user: {
      userId: number;
      nickname: string;
      profileImage: string;
    };
  }[];
  myRecruitingGroup: {
    groupId: number;
    title: string;
    location: string;
    maxCapacity: number;
    currentParticipant: number;
    meetingDate: string;
    movieTitle: string;
  }[];
  myParticipatingGroup: {
    groupId: number;
    title: string;
    location: string;
    maxCapacity: number;
    currentParticipant: number;
    meetingDate: string;
    movieTitle: string;
  }[];
}

export interface PassType {
  currentPw: string;
  newPw: string;
}
