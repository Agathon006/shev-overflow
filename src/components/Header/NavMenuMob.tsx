import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@tanstack/react-router';

export const NavMenuMob = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
}: {
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
}) => {
  return (
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
          Home
        </MenuItem>
        <MenuItem
          component={Link}
          to="/users"
          key="Users"
          onClick={handleCloseNavMenu}
        >
          Users
        </MenuItem>
        <MenuItem
          component={Link}
          to="/questions"
          key="Questions"
          onClick={handleCloseNavMenu}
        >
          Questions
        </MenuItem>
      </Menu>
    </Box>
  );
};
