import axios from 'axios';

import i18n from '@/i18n/i18n';
import { router } from '@/lib/react-router';
import { notify } from '@/utils/notify';

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
    const message = i18n.t(
      (error.response?.data?.message &&
        'backend.' + error.response?.data?.message) ||
        'api.error-message',
    );

    notify({
      type: 'error',
      title: i18n.t('api.error-title'),
      message,
    });

    if (error.response?.status === axios.HttpStatusCode.Unauthorized) {
      router.navigate({ to: '/auth/login' });
    }

    return Promise.reject(error);
  },
);
