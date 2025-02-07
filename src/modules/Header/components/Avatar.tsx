import { Avatar as MuiAvatar } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { queryClient } from '@/App';
import { notify } from '@/utils/notify';

import { useLogout } from '../hooks/useLogout';

export const Avatar = () => {
  const { t } = useTranslation();

  const currentUser: { username: string } | null | undefined =
    queryClient.getQueryData(['currentUser']);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { mutate } = useLogout({
    mutationConfig: {
      onSuccess: () => {
        notify({
          type: 'info',
          title: t('api.header.avatar.logout'),
        });
      },
    },
  });

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickLogout = () => {
    setAnchorElUser(null);
    mutate();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <MuiAvatar
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.main,
            cursor: 'pointer',
          })}
          onClick={handleOpenUserMenu}
          src="/broken-image.jpg"
          alt={currentUser?.username}
        />
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
          <Typography sx={{ textAlign: 'center' }}>
            {t('header.avatar.account')}
          </Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/users/me/posts"
          key="My posts"
          onClick={handleCloseUserMenu}
        >
          <Typography sx={{ textAlign: 'center' }}>
            {t('header.avatar.my-posts')}
          </Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/auth/login"
          key="Logout"
          onClick={handleClickLogout}
        >
          <Typography sx={{ textAlign: 'center' }}>
            {t('header.avatar.logout')}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
