import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const NavMenu = () => {
  const { t } = useTranslation();
  return (
    <Box
      component="nav"
      sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
    >
      <Button key="Home" sx={{ my: 2, color: 'inherit', display: 'block' }}>
        <Link to="/">{t('header.nav.home')}</Link>
      </Button>
      <Button key="Users" sx={{ my: 2, color: 'inherit', display: 'block' }}>
        <Link to="/users">{t('header.nav.users')}</Link>
      </Button>
      <Button
        key="Questions"
        sx={{ my: 2, color: 'inherit', display: 'block' }}
      >
        <Link to="/questions">{t('header.nav.questions')}</Link>
      </Button>
    </Box>
  );
};
