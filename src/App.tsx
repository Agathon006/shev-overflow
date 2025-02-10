import '@/styles/index.scss';
import '@/i18n';

import { CssBaseline } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';

import { Notifications } from '@/components/Notifications';
import { Page404 } from '@/components/Page404';
import { AuthProvider } from '@/context/AuthContext';
import { routeTree } from '@/routeTree.gen';
import { defaultTheme } from '@/theme';

import { useAuth } from './api/auth';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
    mutations: {
      retry: false,
    },
  },
});

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultNotFoundComponent: Page404,
});

const AppContent: React.FC = () => {
  const { data: currentUser, isLoading } = useAuth();

  return isLoading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  ) : (
    <AuthProvider value={{ currentUser }}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <Notifications />
      </ThemeProvider>
    </AuthProvider>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;
