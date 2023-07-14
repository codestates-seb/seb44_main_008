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

export const Signup = (data: SignupType) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/users`, data, {
    headers: {
      // 'ngrok-skip-browser-warning': true,
      'Content-Type': 'multipart/form-data',
    },
  });
