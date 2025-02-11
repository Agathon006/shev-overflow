import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import { useAuth } from '@/api/auth';

const Authenticated = () => {
  const { data: currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  component: Authenticated,
});
