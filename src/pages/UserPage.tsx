import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useUserById } from '@/api/getUserById';
import { Spinner } from '@/components/Spinner';
import { UserProfileCard } from '@/modules/UserProfile';
import { User } from '@/schemas/user';

export const UserPage = ({ userId }: { userId: User['id'] }) => {
  const { t } = useTranslation();
  const { data: user, isLoading } = useUserById({ id: userId });

  if (isLoading) return <Spinner />;

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: '100%',
        marginTop: 2,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography textAlign={'center'} variant="h4">
        {t('user-page.title')}
        <Typography
          component="span"
          sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}
          color="secondary"
          display="inline"
        >
          {user?.username}
        </Typography>
      </Typography>
      <UserProfileCard user={user} />
    </Container>
  );
};
