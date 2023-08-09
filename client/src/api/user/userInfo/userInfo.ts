import { instance } from '../../api';
import { PassType, UserType } from './userInfoType';

export const GetUser = (): Promise<UserType> =>
  instance.get('/users').then(res => res.data);

export const DeleteUser = () => instance.delete(`/users`);

export const PatchPass = (data: PassType) => {
  instance.patch(`/users/password`, data);
};
