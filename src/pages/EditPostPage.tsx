import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useSnippetById } from '@/api/getSnippetById';
import { Spinner } from '@/components/Spinner';
import {
  SnippetEditSchema,
  SnippetForm,
  useEditSnippet,
} from '@/modules/Snippets';
import { SnippetSchema } from '@/schemas/snippet';
import { notify } from '@/utils/notify';

type EditPostPageProps = {
  snippetId: SnippetSchema['id'];
};

export const EditPostPage = ({ snippetId }: EditPostPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: snippet, isLoading } = useSnippetById({ id: snippetId });

  const { mutate: editSnippet, isPending: isEditing } = useEditSnippet({
    snippetId,
    mutationConfig: {
      onSuccess: () => {
        navigate({ to: `/posts/${snippetId}` });
        notify({
          type: 'success',
          title: t('api.snippet-edit-form.edited-post'),
        });
      },
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  const handleSubmit = (data: SnippetEditSchema) => {
    editSnippet({ snippetId, ...data });
  };

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
      <SnippetForm
        defaultValues={snippet}
        snippetId={snippetId}
        onSubmit={handleSubmit}
        isSubmitting={isEditing}
      />
    </Box>
  );
};
