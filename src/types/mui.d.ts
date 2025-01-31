import '@mui/material/styles';

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
