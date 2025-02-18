import { createTheme } from '@mui/material/styles';

// https://mui.com/material-ui/customization/palette/#default-colors

export const defaultTheme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'Inter',
  },
  palette: {
    primary: {
      light: '#fff2d0',
      main: '#ffcc70',
      dark: '#d39f45',
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
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover, &:focus': {
            backgroundColor: theme.palette.customNeutral[300],
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.customNeutral[500],
            '&:hover, &:focus': {
              backgroundColor: theme.palette.customNeutral[700],
              color: theme.palette.customNeutral[100],
            },
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.customNeutral[500]}`,
        }),
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
