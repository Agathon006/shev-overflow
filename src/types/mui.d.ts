import '@mui/material/styles';
import '@mui/material/ButtonBase';

import { LinkProps } from '@tanstack/react-router';

declare module '@mui/material/ButtonBase' {
  interface ButtonBaseOwnProps {
    to?: LinkProps['to'];
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    customNeutral: {
      [key: string]: string;
    };
  }
  interface PaletteOptions {
    customNeutral: {
      [key: string]: string;
    };
  }
}
