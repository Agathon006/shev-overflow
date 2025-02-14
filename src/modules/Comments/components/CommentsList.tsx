import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';
import { SnippetSchema } from '@/modules/Snippets/schemas/snippet';
import { CommentSchema } from '@/schemas/comment';
import { notify } from '@/utils/notify';

import { useDeleteComment } from '../api/deleteComment';
import { usePatchComment } from '../api/patchComment';

export const CommentsList = ({ snippet }: { snippet: SnippetSchema }) => {
  const { t } = useTranslation();
  const [editingCommentId, setEditingCommentId] = useState<null | string>(null);
  const [editedContent, setEditedContent] = useState('');
  const parentRef = useRef(null);

  const { data: currentUser } = useAuth();

  const { mutate: mutateDelete, isPending: deleteIsPending } = useDeleteComment(
    {
      snippetId: snippet.id,
      mutationConfig: {
        onSuccess: () => {
          notify({
            type: 'info',
            title: t('comments.deleted'),
          });
        },
      },
    },
  );

  const { mutate: mutatePatch, isPending: patchIsPending } = usePatchComment({
    snippetId: snippet.id,
    mutationConfig: {
      onSuccess: () => {
        setEditingCommentId(null);
        setEditedContent('');

        notify({
          type: 'info',
          title: t('comments.edited'),
        });
      },
    },
  });

  const rowVirtualizer = useVirtualizer({
    count: snippet.comments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 5,
  });

  const handleEdit = (comment: CommentSchema) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleDelete = (id: string) => {
    mutateDelete({ commentId: id });
  };

  const handleSave = (id: string, content: string) => {
    mutatePatch({ commentId: id, content });
  };

  const handleCancel = () => {
    setEditingCommentId(null);
    setEditedContent('');
  };

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
          const isEditing = editingCommentId === comment.id;
          const isCurrentUser = comment.user?.id === currentUser?.id;

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
                  backgroundColor: isCurrentUser
                    ? theme.palette.primary.light
                    : theme.palette.customNeutral[100],
                  borderRadius: 3,
                  wordBreak: 'break-word',
                  position: 'relative',
                })}
              >
                {isCurrentUser && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    {isEditing ? (
                      <>
                        <IconButton
                          disabled={patchIsPending}
                          onClick={() => handleSave(comment.id, editedContent)}
                          sx={{ p: 0.5, color: 'secondary.dark' }}
                        >
                          <SaveIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton
                          disabled={patchIsPending}
                          onClick={handleCancel}
                          sx={{ p: 0.5, color: 'error.main' }}
                        >
                          <CloseIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          disabled={deleteIsPending}
                          onClick={() => handleEdit(comment)}
                          sx={{ p: 0.5 }}
                        >
                          <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton
                          disabled={deleteIsPending}
                          onClick={() => handleDelete(comment.id)}
                          sx={{ p: 0.5, color: 'error.main' }}
                        >
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </>
                    )}
                  </Box>
                )}
                <Typography variant="subtitle2" sx={{ color: 'primary.dark' }}>
                  {comment.user?.username ?? 'Anonymous'}
                </Typography>
                {isEditing ? (
                  <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                ) : (
                  <Typography variant="body2">{comment.content}</Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
