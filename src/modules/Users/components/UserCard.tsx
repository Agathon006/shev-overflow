import PersonIcon from '@mui/icons-material/Person';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { User } from '@/schemas/user';

type SnippetCardProps = {
  user: User;
};

export const UserCard = ({ user }: SnippetCardProps) => {
  const { t } = useTranslation();

  return (
    <Card
      id={user.id}
      sx={{
        width: '100%',
        margin: 'auto',
      }}
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
    </Card>
  );
};
