import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { Avatar } from '@/components/Header/Avatar';
import { LanguageSwitcher } from '@/components/Header/LanguageSwitcher';
import { Logo } from '@/components/Header/Logo';
import { NavMenu } from '@/components/Header/NavMenu';
import { NavMenuMob } from '@/components/Header/NavMenuMob';

export const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <NavMenuMob />
          <NavMenu />
          <Avatar />
          <LanguageSwitcher />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
