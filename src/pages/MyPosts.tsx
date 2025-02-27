import AddIcon from '@mui/icons-material/Add';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';
import { Spinner } from '@/components/Spinner';
import { SnippetList } from '@/modules/Snippets';

export const MyPostsPage = () => {
  const { t } = useTranslation();

  const { data: currentUser, isLoading } = useAuth();

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, marginBottom: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <Typography variant="h4" sx={{ textAlign: 'left' }}>
          {t('my-posts-page.title')}
        </Typography>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          component={Link}
          to="/posts/create"
        >
          {t('my-posts-page.create-post')}
        </Button>
      </Stack>
      {isLoading ? <Spinner /> : <SnippetList userId={currentUser?.id} />}
    </Container>
  );
};
