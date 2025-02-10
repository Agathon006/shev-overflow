import axios from 'axios';

import { router } from '@/App';
import i18n from '@/i18n/i18n';
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
    if (error.response?.status === axios.HttpStatusCode.Unauthorized) {
      router.navigate({ to: '/auth/login' });
    }

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
    
    return Promise.reject(error);
  },
);
