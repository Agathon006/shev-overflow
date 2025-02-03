import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';

export const LanguageSwitcher = () => {
  return (
    <IconButton aria-label="language" color="inherit" sx={{ ml: 1 }}>
      <LanguageIcon fontSize="large" />
    </IconButton>
  );
};
