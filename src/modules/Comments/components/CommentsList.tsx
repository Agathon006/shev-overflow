import { Box, Paper, Typography } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';
import { SnippetSchema } from '@/modules/Snippets/schemas/snippet';

export const CommentsList = ({ snippet }: { snippet: SnippetSchema }) => {
  const { t } = useTranslation();
  const parentRef = useRef(null);
  const { data: currentUser } = useAuth();

  const rowVirtualizer = useVirtualizer({
    count: snippet.comments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 5,
  });

  return (
    <Paper
      elevation={0}
      sx={{ maxHeight: '50vh', overflow: 'auto' }}
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
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
                pb: 2,
              }}
            >
              <Box
                sx={(theme) => ({
                  p: 1,
                  backgroundColor:
                    comment.user?.id === currentUser?.id
                      ? theme.palette.primary.light
                      : theme.palette.customNeutral[100],
                  borderRadius: 3,
                  wordBreak: 'break-word',
                })}
              >
                <Typography
                  variant="subtitle2"
                  sx={(theme) => ({
                    color: theme.palette.primary.dark,
                  })}
                >
                  {comment.user?.username ?? 'Anonymous'}
                </Typography>
                <Typography variant="body2">{comment.content}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
