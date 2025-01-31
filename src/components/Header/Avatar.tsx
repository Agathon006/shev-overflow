import AvatarIcon from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';

export const Avatar = ({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}: {
  anchorElUser: null | HTMLElement;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
}) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AvatarIcon alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
          to="/users/me"
          key="Account"
          onClick={handleCloseUserMenu}
        >
          <Typography sx={{ textAlign: 'center' }}>Account</Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/users/me/posts"
          key="My posts"
          onClick={handleCloseUserMenu}
        >
          <Typography sx={{ textAlign: 'center' }}>My posts</Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/auth/login"
          key="Logout"
          onClick={handleCloseUserMenu}
        >
          <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
