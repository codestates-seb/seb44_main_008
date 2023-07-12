import axios from 'axios';

const accessToken = localStorage.getItem('token');

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: accessToken,
  },
});
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token || '';
  return config;
});

export const Login = data =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data);

export const PathUser = data => instance.patch('/');
