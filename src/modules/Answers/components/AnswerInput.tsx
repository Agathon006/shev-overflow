import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AnswerSchema } from '@/schemas/answer';
import { QuestionSchema } from '@/schemas/question';
import { notify } from '@/utils/notify';

import { useAnswer } from '../api/createAnswer';

type AnswerFormValues = {
  content: AnswerSchema['content'];
};

export const AnswerInput = ({ question }: { question: QuestionSchema }) => {
  const { t } = useTranslation();
  const { mutate, isPending } = useAnswer({
    questionId: question.id,
    mutationConfig: {
      onSuccess: () => {
        reset();
        notify({ type: 'success', title: t('answers.input.success') });
      },
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AnswerFormValues>();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (data: AnswerFormValues) => {
    mutate({ content: data.content, questionId: question.id });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ position: 'relative', width: '100%' }}
      mt={2}
      mb={2}
    >
      <TextField
        {...register('content', { required: true })}
        disabled={isPending || isSubmitting}
        fullWidth
        multiline
        minRows={2}
        variant="outlined"
        placeholder={t('answers.input.placeholder')}
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
          right: 4,
          minWidth: 'auto',
          padding: '6px',
        }}
      >
        <SendIcon />
      </Button>
    </Box>
  );
};
