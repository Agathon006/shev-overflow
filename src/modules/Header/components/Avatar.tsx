import { Avatar as MuiAvatar } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLogout } from '@/api/logout';
import { User } from '@/schemas/user';
import { notify } from '@/utils/notify';

type AvatarProps = {
  username: User['username'];
};

export const Avatar = ({ username }: AvatarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { mutate } = useLogout({
    mutationConfig: {
      onSuccess: () => {
        navigate({ to: '/auth/login' });
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
    setTimeout(() => {
      setAnchorElUser(null);
    }, 100);
  };

  const handleClickLogout = () => {
    setAnchorElUser(null);
    mutate();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={t('header.avatar.tooltip')}>
        <MuiAvatar
          sx={{ bgcolor: 'secondary.main', cursor: 'pointer' }}
          onClick={handleOpenUserMenu}
          src="/broken-image.jpg"
          alt={username}
        />
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        closeAfterTransition={false}
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
        <MenuItem key="Logout" onClick={handleClickLogout}>
          <Typography sx={{ textAlign: 'center' }}>
            {t('header.avatar.logout')}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
