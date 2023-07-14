import axios from 'axios';
import {
  FileData,
  UserInfoType,
} from '../../../components/Features/Mypage/editmypage/type';
import { instance } from '../../api';

export interface EditUserType {
  userPatchDto: {
    nickname: string | undefined;
    tags: { tagId: number }[];
  };
  profileImage?: FileData | null | undefined;
}

export const getEditUser = (): Promise<UserInfoType> =>
  instance.get('/users/brief').then(res => res.data);

// export const PatchEditUser = (data: EditUserType) =>
//   instance.patch(`/users`, data);

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
