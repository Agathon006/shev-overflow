import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const NavMenu = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button
        component={Link}
        to="/"
        key="Home"
        sx={{ my: 2, color: 'inherit', display: 'block' }}
      >
        {t('header.nav.home')}
      </Button>
      <Button
        component={Link}
        to="/users"
        key="Users"
        sx={{ my: 2, color: 'inherit', display: 'block' }}
      >
        {t('header.nav.users')}
      </Button>
      <Button
        component={Link}
        to="/questions"
        key="Questions"
        sx={{ my: 2, color: 'inherit', display: 'block' }}
      >
        {t('header.nav.questions')}
      </Button>
    </Box>
  );
};
