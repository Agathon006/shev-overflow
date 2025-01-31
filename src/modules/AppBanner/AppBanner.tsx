import MenuIcon from '@mui/icons-material/Menu';
import TerminalIcon from '@mui/icons-material/Terminal';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export const AppBanner = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TerminalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            component={Link}
            to="/"
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Shev Overflow
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem
                component={Link}
                to="/"
                key="Home"
                onClick={handleCloseNavMenu}
              >
                <Typography sx={{ textAlign: 'center' }}>Home</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/users"
                key="Users"
                onClick={handleCloseNavMenu}
              >
                <Typography sx={{ textAlign: 'center' }}>Users</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/questions"
                key="Questions"
                onClick={handleCloseNavMenu}
              >
                <Typography sx={{ textAlign: 'center' }}>Questions</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <TerminalIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            component={Link}
            to="/"
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Shev Overflow
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to="/"
              key="Home"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'inherit', display: 'block' }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/users"
              key="Users"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'inherit', display: 'block' }}
            >
              Users
            </Button>
            <Button
              component={Link}
              to="/questions"
              key="Questions"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'inherit', display: 'block' }}
            >
              Questions
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={Link}
                to="/account"
                key="Account"
                onClick={handleCloseUserMenu}
              >
                <Typography sx={{ textAlign: 'center' }}>Account</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/my-posts"
                key="My posts"
                onClick={handleCloseUserMenu}
              >
                <Typography sx={{ textAlign: 'center' }}>My posts</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/login"
                key="Logout"
                onClick={handleCloseUserMenu}
              >
                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
