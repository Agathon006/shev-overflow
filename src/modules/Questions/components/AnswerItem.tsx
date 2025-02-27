import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/api/auth';
import { useConfirmationDialog } from '@/components/ConfirmationDialog';
import { AnswerSchema } from '@/schemas/answer';
import { QuestionSchema } from '@/schemas/question';
import { notify } from '@/utils/notify';

import { useDeleteAnswer } from '../api/deleteAnswer';
import { useUpdateAnswer } from '../api/updateAnswer';
import { useUpdateAnswerApprove } from '../api/updateAnswerApprove';

type AnswerItemProps = {
  answer: AnswerSchema;
  question: QuestionSchema;
};

export const AnswerItem = ({ answer, question }: AnswerItemProps) => {
  const { t } = useTranslation();

  const [openConfirmationDialog] = useConfirmationDialog();

  const { data: currentUser } = useAuth();
  const isCurrentUser = answer?.user?.id === currentUser?.id;
  const isCurrentUserQuestion = question?.user?.id === currentUser?.id;
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: deleteAnswer, isPending: deleteIsPending } = useDeleteAnswer({
    questionId: question.id,
    mutationConfig: {
      onSuccess: () => {
        notify({ type: 'info', title: t('answers.input.delete-success') });
        setIsEditing(false);
      },
    },
  });

  const { mutate: updateAnswer, isPending: updateIsPending } = useUpdateAnswer({
    questionId: question.id,
    mutationConfig: {
      onSuccess: () => {
        notify({
          type: 'success',
          title: t('answers.input.edit-success'),
        });
        setIsEditing(false);
      },
    },
  });

  const { mutate: updateAnswerApprove, isPending: approveIsPending } =
    useUpdateAnswerApprove({
      questionId: question.id,
      mutationConfig: {
        onSuccess: () => {
          notify({
            type: 'success',
            title: t('answers.approve-success'),
          });
        },
      },
    });

  const { register, handleSubmit, watch, reset } = useForm<{ content: string }>(
    {
      defaultValues: { content: answer.content },
    },
  );

  const onSubmit = (data: { content: string }) => {
    updateAnswer({ answerId: answer.id, content: data.content });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    openConfirmationDialog({
      onConfirm: () => {
        deleteAnswer({ answerId: answer.id });
      },
    });
  };

  const isSaveDisabled =
    watch('content').trim() === '' ||
    watch('content') === answer.content ||
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
        ...(answer.isCorrect && {
          border: `2px dashed ${theme.palette.customSuccess.main}`,
        }),
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
                onClick={handleDeleteClick}
                sx={{ p: 0.5, color: 'error.main' }}
              >
                <DeleteIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </>
          )}
        </Box>
      )}

      <Typography variant="subtitle2" sx={{ color: 'primary.dark' }}>
        {answer?.user?.username ?? 'Anonymous'}
        {isCurrentUserQuestion && (
          <IconButton
            disabled={approveIsPending}
            onClick={() =>
              updateAnswerApprove({
                answerId: answer.id,
                state: answer.isCorrect ? 'incorrect' : 'correct',
              })
            }
            sx={(theme) => ({
              p: 0.5,
              color: answer.isCorrect
                ? theme.palette.customError.main
                : theme.palette.customSuccess.main,
            })}
          >
            {answer.isCorrect ? (
              <UnpublishedIcon sx={{ fontSize: 16 }} />
            ) : (
              <CheckCircleIcon sx={{ fontSize: 16 }} />
            )}
          </IconButton>
        )}
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
        <Typography variant="body2">{answer.content}</Typography>
      )}
    </Box>
  );
};
