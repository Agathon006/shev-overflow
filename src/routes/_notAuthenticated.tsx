import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import { useAuth } from '@/api/auth';

const NotAuthenticated = () => {
  const { data: currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_notAuthenticated')({
  component: NotAuthenticated,
});
