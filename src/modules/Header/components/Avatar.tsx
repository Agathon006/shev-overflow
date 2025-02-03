import AvatarIcon from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Avatar = () => {
  const { t } = useTranslation();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
        <MenuItem key="Account" sx={{ padding: '0' }}>
          <Link
            to="/users/me"
            onClick={handleCloseUserMenu}
            style={{
              padding: '6px 16px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {t('header.avatar.account')}
          </Link>
        </MenuItem>
        <MenuItem key="My posts" sx={{ padding: '0' }}>
          <Link
            to="/users/me/posts"
            onClick={handleCloseUserMenu}
            style={{
              padding: '6px 16px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {t('header.avatar.my-posts')}
          </Link>
        </MenuItem>
        <MenuItem key="Logout" sx={{ padding: '0' }}>
          <Link
            to="/auth/login"
            onClick={handleCloseUserMenu}
            style={{
              padding: '6px 16px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {t('header.avatar.logout')}
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};
