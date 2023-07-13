//팟 모집글 등록, 수정, 특정 모집글 조회, 전체 모집글 검색, 삭제
import axios from 'axios';
import { instance } from '../api';

interface data {
  title: string;
  meetingDate: string;
  location: string;
  maxCapacity: number;
  content: string;
}

interface potData extends data {
  movieTitle: string;
}

interface potItemData extends data {
  groupId: number;
  currentParticipant: number;
}

export const PostPot = (reviewId: number | undefined): Promise<potData> => {
  return instance
    .post(`/reviewBoards/${reviewId}/groups`)
    .then(res => res.data);
};

export const PatchPot = (groupId: number | undefined): Promise<potData> => {
  return instance.patch(`/groups/${groupId}`).then(res => res.data);
};

export const GetPotItem = (
  groupId: number | undefined,
): Promise<potItemData> => {
  return instance.get(`/groups/${groupId}`).then(res => res.data);
};

export const GetPotItemAll = (
  page?: number,
  size?: number,
): Promise<potItemData> => {
  return instance
    .get(`/groups?page=${page}&size=${size}`)
    .then(res => res.data);
};

export const DeletePot = (groupId: number | undefined) => {
  return instance.delete(`/groups/${groupId}`).then(res => res.data);
};
