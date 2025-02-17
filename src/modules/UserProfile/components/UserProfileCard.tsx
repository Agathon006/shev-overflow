import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { LocalSpinner } from '@/components/Spinner';
import { User } from '@/schemas/user';

import { useUserStatisticById } from '../api/getUserStatisticById';

type UserProfileCardProps = {
  userId: User['id'];
};

export const UserProfileCard = ({ userId }: UserProfileCardProps) => {
  const { t } = useTranslation();

  const { data, isLoading } = useUserStatisticById({ id: userId });

  if (isLoading)
    return (
      <Card sx={{ width: 800, margin: 'auto', boxShadow: 3 }}>
        <CardContent>
          <LocalSpinner />
        </CardContent>
      </Card>
    );

  return (
    <Card sx={{ width: 800, margin: 'auto', boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box width="50%">
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.rating')}
              {data?.statistic.rating}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.snippets')}
              {data?.statistic.snippetsCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.comments')}
              {data?.statistic.commentsCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.likes')}
              {data?.statistic.likesCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.dislikes')}
              {data?.statistic.dislikesCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.questions')}
              {data?.statistic.questionsCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.correct-answers')}
              {data?.statistic.correctAnswersCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.regular-answers')}
              {data?.statistic.regularAnswersCount}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            width="50%"
          >
            <Box display="flex" gap={3}>
              <Avatar
                sx={{
                  bgcolor: 'secondary.main',
                  width: 120,
                  height: 120,
                }}
              />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
              >
                <Typography variant="h5" justifySelf="flex-start">
                  {data?.username}
                </Typography>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('user-profile.id')}
                    {data?.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('user-profile.role')}
                    {data?.role}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
              <Button variant="contained" color="warning" sx={{ mr: 2 }}>
                <LogoutIcon />
              </Button>
              <Button variant="contained" color="error">
                <DeleteIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
