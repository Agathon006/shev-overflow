import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';
import { CommentSchema } from '@/schemas/comment';
import { SnippetSchema } from '@/schemas/snippet';
import { notify } from '@/utils/notify';

import { useDeleteComment } from '../api/deleteComment';
import { useUpdateComment } from '../api/updateComment';

type CommentItemProps = {
  comment: CommentSchema;
  snippetId: SnippetSchema['id'];
};

export const CommentItem = ({ comment, snippetId }: CommentItemProps) => {
  const { t } = useTranslation();
  const { data: currentUser } = useAuth();
  const isCurrentUser = comment.user?.id === currentUser?.id;
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: deleteComment, isPending: deleteIsPending } =
    useDeleteComment({
      snippetId,
      mutationConfig: {
        onSuccess: () => {
          notify({ type: 'info', title: t('comments.input.delete-success') });
          setIsEditing(false);
        },
      },
    });

  const { mutate: updateComment, isPending: updateIsPending } =
    useUpdateComment({
      snippetId,
      mutationConfig: {
        onSuccess: () => {
          notify({
            type: 'success',
            title: t('comments.input.edit-success'),
          });
          setIsEditing(false);
        },
      },
    });

  const { register, handleSubmit, watch, reset } = useForm<{ content: string }>(
    {
      defaultValues: { content: comment.content },
    },
  );

  const onSubmit = (data: { content: string }) => {
    updateComment({ commentId: comment.id, content: data.content });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const isSaveDisabled =
    watch('content').trim() === '' ||
    watch('content') === comment.content ||
    updateIsPending;

  return (
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
                disabled={isSaveDisabled}
                onClick={handleSubmit(onSubmit)}
                sx={{ p: 0.5, color: 'secondary.dark' }}
              >
                <SaveIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton
                disabled={updateIsPending}
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
                onClick={handleEdit}
                sx={{ p: 0.5 }}
              >
                <EditIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton
                disabled={deleteIsPending}
                onClick={() => deleteComment({ commentId: comment.id })}
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
          {...register('content')}
          multiline
          fullWidth
          variant="outlined"
          disabled={updateIsPending}
        />
      ) : (
        <Typography variant="body2">{comment.content}</Typography>
      )}
    </Box>
  );
};
