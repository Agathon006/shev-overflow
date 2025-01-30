import { createTheme } from '@mui/material/styles';

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const createCustomTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: cssVar('--color-primary'),
        light: cssVar('--color-primary-light'),
        dark: cssVar('--color-primary-dark'),
        contrastText: cssVar('--color-primary-contrast-text'),
      },
      secondary: {
        main: cssVar('--color-secondary'),
        light: cssVar('--color-secondary-light'),
        dark: cssVar('--color-secondary-dark'),
        contrastText: cssVar('--color-secondary-contrast-text'),
      },
      background: {
        default: cssVar('--color-bg'),
        paper: cssVar('--color-bg-paper'),
      },
      text: {
        primary: cssVar('--color-text-primary'),
        secondary: cssVar('--color-text-secondary'),
      },
    },
  });
