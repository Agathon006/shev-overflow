import '@mui/material/styles';
import '@mui/material/ButtonBase';
import '@mui/material/OverridableComponent';

import { LinkProps } from '@tanstack/react-router';

declare module '@mui/material/ButtonBase' {
  interface ButtonBaseOwnProps {
    to?: LinkProps['to'];
  }
}

declare module '@mui/material/OverridableComponent' {
  interface CommonProps {
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
