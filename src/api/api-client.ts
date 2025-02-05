import axios from 'axios';

import { useNotifications } from '@/components/Notifications';

// import { paths } from '@/config/paths';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const messageTranslationKey =
      error.response?.data?.message || 'api.error-message';

    useNotifications.getState().addNotification({
      type: 'error',
      titleTranslationKey: 'api.error-title',
      messageTranslationKey,
    });

    if (error.response?.status === axios.HttpStatusCode.Unauthorized) {
      // const redirectTo = window.location.pathname;
      // window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);
