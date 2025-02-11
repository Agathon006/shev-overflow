import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { useAuth } from '@/api/auth';
import { Header } from '@/modules/Header';

const Root = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    // TODO: add <Spinner /> component
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
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
