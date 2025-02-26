import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';

import { Avatar } from './Avatar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import { NavMenuMob } from './NavMenuMob';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header = () => {
  const { t } = useTranslation();
  const { data: currentUser } = useAuth();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <NavMenuMob />
          <NavMenu />
          {currentUser?.id ? (
            <Avatar username={currentUser?.username} />
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
          <ThemeSwitcher />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
