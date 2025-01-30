import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { defaultTheme } from './theme';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
  </StrictMode>,
);
