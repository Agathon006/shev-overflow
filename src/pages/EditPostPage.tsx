import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SnippetEditForm, SnippetSchema } from '@/modules/Snippets';

type EditPostPageProps = {
  snippetId: SnippetSchema['id'];
};

export const EditPostPage = ({ snippetId }: EditPostPageProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: 2, marginBottom: 20 }}>
      <Stack direction="row" mb={2} mx={4}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ flexGrow: 1 }}
        >
          {t('edit-post-page.title')}
        </Typography>
      </Stack>
      <SnippetEditForm snippetId={snippetId} />
    </Box>
  );
};
