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
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLogout } from '@/api/logout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { Spinner } from '@/components/Spinner';
import { User } from '@/schemas/user';
import { notify } from '@/utils/notify';

import { useDeleteUser } from '../api/deleteUser';
import { useUserStatisticById } from '../api/getUserStatisticById';

type UserProfileCardProps = {
  user: User | undefined | null;
  isCurrentUser?: boolean;
};

export const UserProfileCard = ({
  user,
  isCurrentUser,
}: UserProfileCardProps) => {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    mutateDeleteUser();
    handleCloseModal();
  };

  const navigate = useNavigate();

  const { data: statisticData, isLoading: isLoadingStatisticData } =
    useUserStatisticById({ id: user?.id });

  const { mutate: mutateLogout, isPending: isUserLogoutPending } = useLogout({
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

  const { mutate: mutateDeleteUser, isPending: isUserDeletionPending } =
    useDeleteUser({
      mutationConfig: {
        onSuccess: () => {
          navigate({ to: '/auth/login' });

          notify({
            type: 'info',
            title: t('api.account-page.account-deletion'),
          });
        },
      },
    });

  if (isLoadingStatisticData) {
    return (
      <Card sx={{ width: 800, margin: 'auto', boxShadow: 3 }}>
        <CardContent>
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', boxShadow: 3 }}>
      <CardContent>
        <Box
          display="flex"
          gap={2}
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems="center"
        >
          <Box width={{ xs: '100%', md: '50%' }}>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.rating')} {statisticData?.statistic.rating}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.snippets')}{' '}
              {statisticData?.statistic.snippetsCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.comments')}{' '}
              {statisticData?.statistic.commentsCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.likes')} {statisticData?.statistic.likesCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.dislikes')}{' '}
              {statisticData?.statistic.dislikesCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.questions')}{' '}
              {statisticData?.statistic.questionsCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.correct-answers')}{' '}
              {statisticData?.statistic.correctAnswersCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('user-profile.regular-answers')}{' '}
              {statisticData?.statistic.regularAnswersCount}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            width={{ xs: '100%' }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              alignItems="center"
              gap={2}
            >
              <Avatar
                sx={{ bgcolor: 'secondary.main', width: 120, height: 120 }}
              />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                textAlign={{ xs: 'center', md: 'left' }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    maxWidth: 320,
                  }}
                >
                  {user?.username}
                </Typography>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('user-profile.id')} {user?.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('user-profile.role')} {user?.role}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {isCurrentUser && (
              <Box mt={2} display="flex" gap={2}>
                <Button
                  disabled={isUserLogoutPending || isUserDeletionPending}
                  variant="contained"
                  color="warning"
                  onClick={() => mutateLogout()}
                >
                  <LogoutIcon />
                </Button>
                <Button
                  disabled={isUserLogoutPending || isUserDeletionPending}
                  variant="contained"
                  color="error"
                  onClick={handleOpenModal}
                >
                  <DeleteIcon />
                </Button>
                <ConfirmationModal
                  open={modalOpen}
                  onClose={handleCloseModal}
                  onConfirm={handleConfirm}
                />
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
