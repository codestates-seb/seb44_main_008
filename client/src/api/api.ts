import axios from 'axios';

const accessToken = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken');

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: accessToken,
    Refresh: refreshToken,
  },
});
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token || '';
  return config;
});
