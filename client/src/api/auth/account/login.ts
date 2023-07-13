import axios from 'axios';

interface loginType {
  email: string;
  password: string;
}
export interface signupType {
  userPostDto: {
    email: string;
    password: string;
    tags: { tagId: number }[];
    name: string;
    nickname: string;
    birth: string;
  };
  profileImage: string;
}

export const Login = (data: loginType) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data);
