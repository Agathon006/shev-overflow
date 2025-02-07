import { createFileRoute, redirect } from '@tanstack/react-router';

import { RegisterPage } from '@/pages/RegisterPage';
import { isAuthenticated } from '@/utils/isAuthenticated';

export const Route = createFileRoute('/auth/register')({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: RegisterPage,
});
