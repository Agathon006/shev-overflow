import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useAuthContext } from '@/context/AuthContext';

import { Avatar } from './Avatar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import { NavMenuMob } from './NavMenuMob';

export const Header = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuthContext();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <NavMenuMob />
          <NavMenu />
          {currentUser?.id ? (
            <Avatar />
          ) : (
            <Button
              component={Link}
              to="/auth/login"
              key="Login"
              sx={{ my: 2, color: 'inherit', display: 'block' }}
            >
              {t('header.login-button')}
            </Button>
          )}
          <LanguageSwitcher />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
