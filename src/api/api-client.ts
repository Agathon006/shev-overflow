import axios from 'axios';
import i18n from 'i18next';

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
    const message =
      error.response?.data?.message || i18n.t('api.error-message');

    useNotifications.getState().addNotification({
      type: 'error',
      title: i18n.t('api.error-title'),
      message,
    });

    if (error.response?.status === axios.HttpStatusCode.Unauthorized) {
      // const redirectTo = window.location.pathname;
      // window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);
