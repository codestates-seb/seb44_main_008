import axios from 'axios';

interface loginType {
  email: string;
  password: string;
}

export const Login = (data: loginType) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data);