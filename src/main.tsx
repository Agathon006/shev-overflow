import './styles/index.scss';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { defaultTheme } from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
  </StrictMode>,
);
