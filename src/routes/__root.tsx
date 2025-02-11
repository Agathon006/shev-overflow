import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { useAuth } from '@/api/auth';
import { Spinner } from '@/components/Spinner';
import { Header } from '@/modules/Header';

const Root = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Root,
});
