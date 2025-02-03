import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="language"
        color="inherit"
        sx={{ ml: 1 }}
        onClick={handleClick}
      >
        <LanguageIcon fontSize="large" />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="language-menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleLanguageChange('en')}>
          {t('header.language-switcher.en')}
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('ru')}>
          {t('header.language-switcher.ru')}
        </MenuItem>
      </Menu>
    </>
  );
};
