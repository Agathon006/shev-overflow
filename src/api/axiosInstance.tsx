import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || 'An unexpected error occurred';
    const statusCode = error.response?.status;

    console.error(`Error ${statusCode}: ${message}`);


    return Promise.reject({ message, statusCode });
  },
);
