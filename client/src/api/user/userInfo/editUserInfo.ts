import axios from 'axios';
import { UserInfoType } from '../../../components/Features/Mypage/editmypage/type';
import { instance } from '../../api';

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

export const getEditUser = (): Promise<UserInfoType> =>
  instance.get('/users/brief').then(res => res.data);

export const PatchEditUser = (data: EditUserType) => {
  const formData = new FormData();

  formData.append(
    'userPatchDto',
    new Blob([JSON.stringify(data.userPatchDto)], { type: 'application/json' }),
  );
  if (data.profileImage) {
    formData.append('profileImage', data.profileImage);
  }

  return axios.patch(`${import.meta.env.VITE_BASE_URL}/users`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem('token'),
      Refresh: localStorage.getItem('refreshToken'),
    },
  });
};

export const PatchEditUserPassword = (data: EditPasswordType) =>
  instance.patch('/users/password', data);
