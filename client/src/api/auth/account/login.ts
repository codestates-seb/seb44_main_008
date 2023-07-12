import axios from 'axios';

interface loginType {
  email: string;
  password: string;
}
interface signupType {
  email: string;
  password: string;
  name: string;
  tags: {
    tagId: number;
  }[];
  nickname: string;
  birth: string;
}

export const Login = (data: loginType) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data);

export const Signup = (data: signupType) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/users`, data);
