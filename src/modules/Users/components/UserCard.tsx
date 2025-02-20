import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';
import { User } from '@/schemas/user';

type SnippetCardProps = {
  user: User;
};

export const UserCard = ({ user }: SnippetCardProps) => {
  const { t } = useTranslation();

  const { data: currentUser } = useAuth();
  const isCurrentUser = user.id === currentUser?.id;

  return (
    <Card
      id={user.id}
      sx={(theme) => ({
        width: '100%',
        margin: 'auto',
        backgroundColor: isCurrentUser
          ? theme.palette.primary.light
          : theme.palette.customNeutral[100],
        position: 'relative',
      })}
    >
      <CardHeader
        avatar={
          <Avatar>
            <PersonIcon />
          </Avatar>
        }
        title={user.username ?? 'Someone'}
      />
      <CardContent>
        <Typography>
          {t('users.user-card.user-id-span')}
          {user.id ?? 'Someone'}
        </Typography>
        <Typography>
          {t('users.user-card.user-role-span')}
          {user.role ?? 'Someone'}
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
        }}
      >
        <IconButton
          component={Link}
          to={isCurrentUser ? '/users/me' : '/users/$userId'}
          params={!isCurrentUser ? { userId: user.id } : undefined}
          color="secondary"
        >
          <VisibilityIcon />
        </IconButton>
      </Box>
    </Card>
  );
};
