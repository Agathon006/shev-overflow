import '@/styles/index.scss';
import '@/i18n';

import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import React from 'react';

import { Notifications } from '@/components/Notifications';
import { queryClient } from '@/lib/react-query';
import { router } from '@/lib/react-router';
import { DialogsContainer } from '@/services/dialogService';
import { ThemeProviderWrapper } from '@/theme';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper>
        <CssBaseline />
        <RouterProvider router={router} />
        <DialogsContainer />
        <Notifications />
      </ThemeProviderWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
