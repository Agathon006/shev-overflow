import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SnippetSchema } from '@/modules/Snippets';
import { notify } from '@/utils/notify';

import { useComment } from '../api/createComment';

export const CommentInput = ({ snippet }: { snippet: SnippetSchema }) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  const { mutate, isPending } = useComment({
    snippetId: snippet.id,
    mutationConfig: {
      onSuccess: () => {
        setComment('');

        notify({
          type: 'success',
          title: t('comments.input.success'),
        });
      },
    },
  });

  const handleSend = () => {
    mutate({ content: comment, snippetId: snippet.id });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (comment.trim()) {
        handleSend();
      }
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        disabled={isPending}
        fullWidth
        multiline
        minRows={2}
        variant="outlined"
        placeholder={t('comments.input.placeholder')}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{ pr: 6 }}
      />
      <Button
        disabled={isPending || comment.trim() === ''}
        variant="contained"
        color="primary"
        onClick={handleSend}
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
