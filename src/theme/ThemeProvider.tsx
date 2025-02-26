import { ThemeProvider } from '@mui/material/styles';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { darkTheme, lightTheme } from './theme';

type ThemeContextType = {
  currentTheme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'light',
  setTheme: () => {},
});

export const ThemeProviderWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  const savedTheme = localStorage.getItem('appTheme') || systemTheme;
  const [currentTheme, setCurrentTheme] = useState(savedTheme);

  const themeObject = currentTheme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    localStorage.setItem('appTheme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
      <ThemeProvider theme={themeObject}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
