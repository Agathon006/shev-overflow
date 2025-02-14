import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/api/auth';
import { SnippetSchema } from '@/modules/Snippets';
import { CommentSchema } from '@/schemas/comment';

import { useDeleteComment } from '../api/deleteComment';
import { usePatchComment } from '../api/updateComment';

type CommentItemProps = {
  comment: CommentSchema;
  snippetId: SnippetSchema['id'];
};

export const CommentItem = ({ comment, snippetId }: CommentItemProps) => {
  const { data: currentUser } = useAuth();
  const isCurrentUser = comment.user?.id === currentUser?.id;

  const { mutate: deleteComment, isPending: deleteIsPending } =
    useDeleteComment({
      snippetId,
    });

  const { mutate: updateComment, isPending: updateIsPending } = usePatchComment(
    {
      snippetId,
    },
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<{ content: string }>({
    defaultValues: { content: comment.content },
  });

  const onSubmit = (data: { content: string }) => {
    updateComment(
      { commentId: comment.id, content: data.content },
      { onSuccess: () => reset({ content: data.content }) },
    );
  };

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
          {isSubmitting ? (
            <>
              <IconButton
                disabled={updateIsPending}
                type="submit"
                sx={{ p: 0.5, color: 'secondary.dark' }}
              >
                <SaveIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton
                disabled={updateIsPending}
                onClick={() => reset()}
                sx={{ p: 0.5, color: 'error.main' }}
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                disabled={deleteIsPending}
                onClick={handleSubmit(onSubmit)}
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

      {isSubmitting ? (
        <TextField
          {...register('content')}
          multiline
          fullWidth
          variant="outlined"
        />
      ) : (
        <Typography variant="body2">{comment.content}</Typography>
      )}
    </Box>
  );
};
