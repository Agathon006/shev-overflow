import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: 'var(--color-primary)' },
    secondary: { main: 'var(--color-secondary)' },
    background: { default: 'var(--color-bg)', paper: 'var(--color-bg-paper)' },
    text: {
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: 'var(--color-primary)' },
    secondary: { main: 'var(--color-secondary)' },
    background: { default: 'var(--color-bg)', paper: 'var(--color-bg-paper)' },
    text: {
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
    },
  },
});

export { lightTheme, darkTheme };
