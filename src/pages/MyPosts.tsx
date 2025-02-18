import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { SnippetList } from '@/modules/Snippets';

export const MyPostsPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Stack
        position={'relative'}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        mx={4}
      >
        <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
          {t('my-posts-page.title')}
        </Typography>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          sx={{ position: 'absolute', right: 0, top: 2 }}
          component={Link}
          to="/posts/create"
        >
          {t('my-posts-page.create-post')}
        </Button>
      </Stack>
      <SnippetList onlyCurrentUserPosts />
    </Box>
  );
};
