import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => config);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
