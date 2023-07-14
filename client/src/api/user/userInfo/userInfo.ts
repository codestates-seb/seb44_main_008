import { instance } from '../../api';

type UserType = {
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
};
type PassType = {
  currentPw: string;
  newPw: string;
};
export const GetUser = (): Promise<UserType> =>
  instance.get('/users').then(res => res.data);

export const DeleteUser = () => instance.delete(`/users`);

export const PatchPass = (data: PassType) => {
  instance.patch(`/users/password`, data);
};
