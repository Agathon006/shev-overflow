import { createFileRoute, redirect } from '@tanstack/react-router';

import { isAuthenticated } from '@/utils/isAuthenticated';

export const Route = createFileRoute('/_notAuthenticated')({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({
        to: '/',
      });
    }
  },
});
