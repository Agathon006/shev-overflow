import { createFileRoute } from '@tanstack/react-router';

import { LoginPage } from '@/pages/LoginPage';

export const Route = createFileRoute('/_notAuthenticated/auth/login')({
  component: LoginPage,
});
