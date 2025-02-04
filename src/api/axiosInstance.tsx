import axios from 'axios';

import { useNotifications } from '@/components/Notifications';

// import { paths } from '@/config/paths';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Accept = 'application/json';
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || 'Unexpected error occurred';

    useNotifications.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    if (error.response?.status === 401) {
      // const redirectTo = window.location.pathname;
      // window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);
