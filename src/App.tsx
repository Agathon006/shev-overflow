import '@/styles/index.scss';
import '@/i18n';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';

import { Notifications } from '@/components/Notifications';
import { routeTree } from '@/routeTree.gen';
import { defaultTheme } from '@/theme';

export const router = createRouter({ routeTree });

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <Notifications />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
