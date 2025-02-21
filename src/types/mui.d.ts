import '@mui/material/styles';
import '@mui/material/ButtonBase';
import '@mui/material/OverridableComponent';

import { LinkProps } from '@tanstack/react-router';

declare module '@mui/material/ButtonBase' {
  interface ButtonBaseOwnProps {
    to?: LinkProps['to'];
    params?: LinkProps['params'];
  }
}

declare module '@mui/material/OverridableComponent' {
  interface CommonProps {
    to?: LinkProps['to'];
    params?: LinkProps['params'];
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    customNeutral: {
      [key: string]: string;
    };
    customSuccess: {
      [key: string]: string;
    };
    customError: {
      [key: string]: string;
    };
  }
  interface PaletteOptions {
    customNeutral: {
      [key: string]: string;
    };
    customSuccess: {
      [key: string]: string;
    };
    customError: {
      [key: string]: string;
    };
  }
}
