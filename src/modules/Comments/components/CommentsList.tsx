import { Box, Paper, Typography } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { SnippetSchema } from '@/modules/Snippets/schemas/snippet';

export const CommentsList = ({ snippet }: { snippet: SnippetSchema }) => {
  const { t } = useTranslation();
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: snippet.comments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
  });

  return (
    <Paper
      elevation={0}
      sx={{ maxHeight: '60vh', overflow: 'auto' }}
      ref={parentRef}
    >
      <Typography variant="h6" gutterBottom>
        {t('comments.title')}
      </Typography>
      <Box
        sx={{
          position: 'relative',
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const comment = snippet.comments[virtualRow.index];
          return (
            <Box
              key={comment.id}
              sx={(theme) => ({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
                p: 1,
                backgroundColor: theme.palette.customNeutral[100],
              })}
            >
              <Typography
                variant="subtitle2"
                color="primary"
                sx={(theme) => ({
                  color: theme.palette.primary.dark,
                })}
              >
                {comment.user?.username ?? 'Anonymous'}
              </Typography>
              <Typography variant="body2">{comment.content}</Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
