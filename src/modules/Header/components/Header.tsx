import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { Avatar } from './Avatar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import { NavMenuMob } from './NavMenuMob';

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
