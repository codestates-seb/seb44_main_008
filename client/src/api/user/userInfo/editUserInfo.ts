import { UserInfoType } from '../../../components/Features/Mypage/editmypage/type';
import { instance } from '../../api';

export const getEditUser = (): Promise<UserInfoType> =>
  instance.get('/users/brief').then(res => res.data);
