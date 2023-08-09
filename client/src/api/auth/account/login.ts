import axios from 'axios';
import { loginType } from './loginType';

export const Login = (data: loginType) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data);
