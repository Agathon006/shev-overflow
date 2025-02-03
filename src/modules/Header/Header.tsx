import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { Avatar } from './components/Avatar';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Logo } from './components/Logo';
import { NavMenu } from './components/NavMenu';
import { NavMenuMob } from './components/NavMenuMob';

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
