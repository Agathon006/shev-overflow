import { createFileRoute, redirect } from '@tanstack/react-router';

import { isAuthenticated } from '@/utils/isAuthenticated';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: window.location.pathname,
        },
      });
    }
  },
});