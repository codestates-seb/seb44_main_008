import { PopperDetailData } from '../../../components/Features/Detail/Popper/popperType';
import { instance } from '../../api';
import { UserType } from '../userInfo/userInfo';

export const GetTabA = (): Promise<UserType> => {
  return instance.get('/users').then(res => res.data.data);
};

export const DeleteTabA = (postId: number) =>
  instance.delete(`/users/reviewBoards/${postId}`).then(res => res.data);

export const DeleteTabB = (postId: number) =>
  instance.delete(`/reviewBoards/${postId}`).then(res => res.data);

export const GetTabCModal = (groupId: number): Promise<PopperDetailData> => {
  return instance.get(`/groups/${groupId}`).then(res => res.data.data);
};
