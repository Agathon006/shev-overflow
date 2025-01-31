import './styles/index.scss';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from '@tanstack/react-router';
import React from 'react';

import { router } from './router';
import { defaultTheme } from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
