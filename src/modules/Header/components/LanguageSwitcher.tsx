import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <IconButton
      aria-label="language"
      color="inherit"
      sx={{ ml: 1 }}
      onClick={handleLanguageChange}
    >
      <LanguageIcon fontSize="large" />
    </IconButton>
  );
};
