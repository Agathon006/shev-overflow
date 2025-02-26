import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentLang = i18n.language || 'en';

  const enRef = useRef<HTMLLIElement>(null);
  const ruRef = useRef<HTMLLIElement>(null);

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

  useEffect(() => {
    if (anchorEl) {
      if (currentLang === 'en' && enRef.current) {
        enRef.current.focus();
      } else if (currentLang === 'ru' && ruRef.current) {
        ruRef.current.focus();
      }
    }
  }, [anchorEl, currentLang]);

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
        closeAfterTransition={false}
      >
        <MenuItem
          ref={enRef}
          selected={currentLang === 'en'}
          onClick={() => handleLanguageChange('en')}
        >
          {t('header.language-switcher.en')}
        </MenuItem>
        <MenuItem
          ref={ruRef}
          selected={currentLang === 'ru'}
          onClick={() => handleLanguageChange('ru')}
        >
          {t('header.language-switcher.ru')}
        </MenuItem>
      </Menu>
    </>
  );
};
