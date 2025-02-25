import { ThemeProvider } from '@mui/material/styles';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { darkTheme, defaultTheme } from './theme';

interface ThemeContextType {
  currentTheme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'default',
  setTheme: () => {},
});

export const ThemeProviderWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const savedTheme = localStorage.getItem('appTheme') || 'default';
  const [currentTheme, setCurrentTheme] = useState(savedTheme);

  const themeObject = currentTheme === 'default' ? defaultTheme : darkTheme;

  useEffect(() => {
    localStorage.setItem('appTheme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
      <ThemeProvider theme={themeObject}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
