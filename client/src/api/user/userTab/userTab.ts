import { instance } from '../../api';
import { UserType } from '../userInfo/userInfo';

export const GetTabA = (): Promise<UserType> =>
  instance.get('/users').then(res => res.data.data);

export const DeleteTabA = (postId: number) =>
  instance.delete(`/users/reviewBoards/${postId}`).then(res => res.data);
