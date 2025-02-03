import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export const NavMenuMob = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <Box
      component="nav"
      sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
    >
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
        <MenuItem key="Home" sx={{ padding: '0' }}>
          <Link
            to="/"
            onClick={handleCloseNavMenu}
            style={{
              padding: '6px 16px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Home
          </Link>
        </MenuItem>
        <MenuItem key="Users" sx={{ padding: '0' }}>
          <Link
            to="/users"
            onClick={handleCloseNavMenu}
            style={{
              padding: '6px 16px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Users
          </Link>
        </MenuItem>
        <MenuItem key="Questions" sx={{ padding: '0' }}>
          <Link
            to="/questions"
            onClick={handleCloseNavMenu}
            style={{
              padding: '6px 16px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Questions
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};
