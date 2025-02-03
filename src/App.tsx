import '@/styles/index.scss';
import '@/i18n';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';

import { routeTree } from '@/routeTree.gen';
import { defaultTheme } from '@/theme';

export const router = createRouter({ routeTree });

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
