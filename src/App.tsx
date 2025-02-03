import '@/styles/index.scss';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';

import { routeTree } from '@/routeTree.gen';
import { defaultTheme } from '@/theme';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
