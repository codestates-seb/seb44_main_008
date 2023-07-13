import axios from 'axios';

interface loginType {
  email: string;
  password: string;
}
export interface SignupType {
  userPostDto: {
    email: string;
    name: string;
    password: string;
    tags: { tagId: number }[];
    nickname: string;
    birth: string;
  };
  profileImage?: string;
}

export const Login = (data: loginType) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data);

export const Signup = (data: SignupType) => {
  const formData = new FormData();

  formData.append('post', JSON.stringify(data.userPostDto));
  if (data.profileImage && data.profileImage.length) {
    formData.append('profileImage', data.profileImage[0]);
  }

  return axios.post(`${import.meta.env.VITE_BASE_URL}/users`, formData, {
    headers: {
      'ngrok-skip-browser-warning': true,
      'Content-Type': 'multipart/form-data',
    },
  });
};
