import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SnippetSchema } from '@/modules/Snippets';
import { CommentSchema } from '@/schemas/comment';
import { notify } from '@/utils/notify';

import { useComment } from '../api/createComment';

type CommentFormValues = {
  content: CommentSchema['content'];
};

export const CommentInput = ({ snippet }: { snippet: SnippetSchema }) => {
  const { t } = useTranslation();
  const { mutate, isPending } = useComment({
    snippetId: snippet.id,
    mutationConfig: {
      onSuccess: () => {
        reset();
        notify({ type: 'success', title: t('comments.input.success') });
      },
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CommentFormValues>();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (data: CommentFormValues) => {
    mutate({ content: data.content, snippetId: snippet.id });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ position: 'relative', width: '100%' }}
    >
      <TextField
        {...register('content', { required: true })}
        disabled={isPending || isSubmitting}
        fullWidth
        multiline
        minRows={2}
        variant="outlined"
        placeholder={t('comments.input.placeholder')}
        onKeyDown={handleKeyDown}
        sx={{ pr: 6 }}
      />
      <Button
        type="submit"
        disabled={isPending || isSubmitting}
        variant="contained"
        color="primary"
        sx={{
          position: 'absolute',
          top: 2,
          right: 8,
          minWidth: 'auto',
          padding: '6px',
        }}
      >
        <SendIcon />
      </Button>
    </Box>
  );
};
