import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useQuestionById } from '@/api/getQuestionById';
import { Spinner } from '@/components/Spinner';
import { YesNoLabel } from '@/components/YesNoLabel';
import { createDialogHook } from '@/services/dialogService';

import {
  QuestionEditSchema,
  questionEditSchema,
} from '../schemas/questionEdit';

type DialogQuestionFormProps = {
  onClose: () => void;
  questionId?: string;
  isCurrentUser?: boolean;
  onSubmit: (data: QuestionEditSchema, reset?: () => void) => void;
};

const DialogQuestionForm = ({
  onClose,
  questionId,
  onSubmit,
}: DialogQuestionFormProps) => {
  const { t } = useTranslation();
  const { data: question, isLoading } = useQuestionById({ id: questionId });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionEditSchema>({
    resolver: zodResolver(questionEditSchema),
    defaultValues: {
      title: '',
      description: '',
      attachedCode: '',
    },
  });

  useEffect(() => {
    if (question) {
      reset({
        title: question.title || '',
        description: question.description || '',
        attachedCode: question.attachedCode || '',
      });
    }
  }, [question, reset]);

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleFormSubmit = (data: QuestionEditSchema) => {
    onSubmit(data, reset);
    handleClose();
  };

  if (isLoading)
    return (
      <Dialog open onClose={handleClose} fullWidth>
        <Spinner />
      </Dialog>
    );

  return (
    <Dialog open onClose={handleClose} fullWidth>
      <Container sx={{ padding: 2 }}>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          {question?.id && (
            <Box mb={2}>
              <Typography variant="h6">
                {t('questions-table.header.is-resolved')}
                {': '}
                {question?.isResolved ? <YesNoLabel truth /> : <YesNoLabel />}
              </Typography>
            </Box>
          )}
          <Stack direction="column" spacing={2} mb={1}>
            <Typography variant="h6">
              {t('modal-question-form.title-span')}
            </Typography>
            <TextField
              variant="standard"
              label={t('modal-question-form.title-input-placeholder')}
              type="text"
              fullWidth
              margin="normal"
              {...register('title')}
              error={!!errors.title}
              helperText={
                errors.title
                  ? t('modal-question-form.error.title-message')
                  : null
              }
            />
            <Typography variant="h6">
              {t('modal-question-form.description-span')}
            </Typography>
            <TextField
              variant="standard"
              label={t('modal-question-form.description-input-placeholder')}
              type="text"
              fullWidth
              margin="normal"
              {...register('description')}
              error={!!errors.description}
              helperText={
                errors.description
                  ? t('modal-question-form.error.description-message')
                  : null
              }
            />
            <Typography variant="h6">
              {t('modal-question-form.code-span')}
            </Typography>
            <Controller
              name="attachedCode"
              control={control}
              render={({ field: { onChange, value } }) => (
                <MonacoEditor
                  height="400px"
                  theme="vs-dark"
                  defaultValue={question?.attachedCode}
                  value={value}
                  onChange={(val) => onChange(val)}
                  options={{
                    selectOnLineNumbers: true,
                    automaticLayout: true,
                    lineNumbers: 'on',
                    minimap: { enabled: false },
                    padding: { top: 10 },
                  }}
                />
              )}
            />
            {errors.attachedCode && (
              <Typography color="error">
                {t('modal-question-form.error.code-message')}
              </Typography>
            )}
          </Stack>
          <Stack direction="row" justifyContent="center">
            <DialogActions>
              <Button variant="contained" type="submit">
                {question?.id
                  ? t('modal-question-form.edit-question-button-span')
                  : t('modal-question-form.ask-question-button-span')}
              </Button>
            </DialogActions>
          </Stack>
        </Box>
      </Container>
    </Dialog>
  );
};

export const useQuestionFormDialog = createDialogHook<DialogQuestionFormProps>(
  (props) => <DialogQuestionForm {...props} />,
);
