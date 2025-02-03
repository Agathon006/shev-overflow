import { createTheme } from '@mui/material/styles';

// https://mui.com/material-ui/customization/palette/#default-colors

export const defaultTheme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'Inter',
  },
  palette: {
    primary: {
      light: '#ffe4a1',
      main: '#ffcc70',
      dark: '#e6b35d',
    },
    secondary: {
      light: '#a1c4ff',
      main: '#70a8ff',
      dark: '#5d8ee6',
    },
    customNeutral: {
      '100': '#f8f9fa',
      '200': '#e9ecef',
      '300': '#dee2e6',
      '400': '#ced4da',
      '500': '#adb5bd',
      '600': '#6c757d',
      '700': '#495057',
      '800': '#343a40',
      '900': '#212529',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        inputProps: {
          autoComplete: 'off',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'primary.dark',
        sx: {
          '&:hover': {
            color: 'secondary.dark',
          },
        },
      },
    },
  },
});

// TODO (if need)
// mode: 'dark',
// primary: {
//   light: '#a1ffe4',
//   main: '#70ffcc',
//   dark: '#5dd6b3',
// },
// secondary: {
//   light: '#ffa1c4',
//   main: '#ff70a8',
//   dark: '#d65d8e',
// },
