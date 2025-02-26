import { createTheme } from '@mui/material/styles';

// https://mui.com/material-ui/customization/palette/#default-colors

export const lightTheme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'Inter',
  },
  palette: {
    mode: 'light',
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

export const darkTheme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'Inter',
  },
  palette: {
    mode: 'dark',
    primary: {
      light: '#3da68a',
      main: '#70ffcc',
      dark: '#a1ffe4',
    },
    secondary: {
      light: '#d65d8e',
      main: '#ff5d9d',
      dark: '#ffa1c4',
    },
    customNeutral: {
      '100': '#212529',
      '200': '#343a40',
      '300': '#495057',
      '400': '#6c757d',
      '500': '#adb5bd',
      '600': '#ced4da',
      '700': '#dee2e6',
      '800': '#e9ecef',
      '900': '#f8f9fa',
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
        color: 'primary.light',
        sx: {
          '&:hover': {
            color: 'secondary.light',
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
