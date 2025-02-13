import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SnippetSchema } from '@/modules/Snippets/schemas/snippet';

export const CommentInput = ({ snippet }: { snippet: SnippetSchema }) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState('');

  const handleSend = () => {
    if (comment.trim()) {
      console.log(snippet);
      //   onSubmit?.(comment);
      setComment('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
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
