import { Container, Stack, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  SnippetEditSchema,
  SnippetForm,
  useCreateSnippet,
} from '@/modules/Snippets';
import { notify } from '@/utils/notify';

export const CreatePostPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: createSnippet, isPending: isCreating } = useCreateSnippet({
    mutationConfig: {
      onSuccess: (newSnippet) => {
        navigate({ to: `/posts/${newSnippet.id}` });
        notify({
          type: 'success',
          title: t('api.snippet-edit-form.created-post'),
        });
      },
    },
  });

  const handleSubmit = (data: SnippetEditSchema) => {
    createSnippet(data);
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, marginBottom: 20 }}>
      <Stack direction="row" mb={2} mx={4}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ flexGrow: 1 }}
        >
          {t('create-post-page.title')}
        </Typography>
      </Stack>
      <SnippetForm
        defaultValues={{ language: '', code: '' }}
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
      />
    </Container>
  );
};
