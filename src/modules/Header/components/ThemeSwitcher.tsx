import ContrastIcon from '@mui/icons-material/Contrast';
import { IconButton } from '@mui/material';
import { useContext } from 'react';

import { ThemeContext } from '@/theme';

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton aria-label="theme" color="inherit" onClick={toggleTheme}>
      <ContrastIcon fontSize="large" />
    </IconButton>
  );
};
