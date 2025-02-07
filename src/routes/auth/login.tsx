import { createFileRoute, redirect } from '@tanstack/react-router';

import { LoginPage } from '@/pages/LoginPage';
import { isAuthenticated } from '@/utils/isAuthenticated';

export const Route = createFileRoute('/auth/login')({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: LoginPage,
});
