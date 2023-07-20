//팟 모집글 등록, 수정, 특정 모집글 조회, 전체 모집글 검색, 삭제
import { instance } from '../api';
import { PopperDetailData } from '../../components/Features/Detail/Popper/popperType';

export interface data {
  title: string | undefined;
  meetingDate: string | undefined;
  location: string | undefined;
  maxCapacity: number | undefined;
  content: string | undefined;
}

export interface potData extends data {
  movieTitle: string;
}

export const PostPot = (reviewId: string, data: potData) => {
  return instance
    .post(`/reviewBoards/${reviewId}/groups`, data)
    .then(res => res.data);
};

export const PatchPot = (groupId: number | undefined): Promise<potData> => {
  return instance.patch(`/groups/${groupId}`).then(res => res.data);
};

export const GetPotItem = (
  groupId: number | undefined,
): Promise<PopperDetailData> => {
  return instance.get(`/groups/${groupId}`).then(res => res.data);
};

export const GetPotItemAll = (
  page?: number,
  size?: number,
): Promise<PopperDetailData> => {
  return instance
    .get(`/groups?page=${page}&size=${size}`)
    .then(res => res.data);
};

export const DeletePot = (groupId: number | undefined) => {
  return instance.delete(`/groups/${groupId}`).then(res => res.data);
};

export const JoinPot = (groupId: number | undefined) => {
  return instance.post(`/users/groups/${groupId}`).then(res => res.data);
};
