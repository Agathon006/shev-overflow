import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import EditIcon from '@mui/icons-material/Edit';
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
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@/components/Spinner';
import { YesNoLabel } from '@/components/YesNoLabel';
import { createDialogHook } from '@/services/dialogService';

import { useQuestionById } from '../api/getQuestionById';
import {
  QuestionEditSchema,
  questionEditSchema,
} from '../schemas/questionEdit';
import { AnswerInput } from './AnswerInput';
import { AnswersList } from './AnswersList';

type DialogQuestionFormProps = {
  onClose: () => void;
  questionId?: string;
  isCurrentUser?: boolean;
  onSubmit: (
    data: QuestionEditSchema,
    setIsEditing?: (value: boolean) => void,
    reset?: () => void,
  ) => void;
};

const DialogQuestionForm = ({
  onClose,
  questionId,
  isCurrentUser,
  onSubmit,
}: DialogQuestionFormProps) => {
  const { t } = useTranslation();
  const { data: question, isLoading } = useQuestionById({ id: questionId });
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false);
  };

  const handleFormSubmit = (data: QuestionEditSchema) => {
    onSubmit(data, setIsEditing, reset);
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
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">
                {t('questions-table.header.is-resolved')}
                {': '}
                {question?.isResolved ? <YesNoLabel truth /> : <YesNoLabel />}
              </Typography>
              {question?.id && isCurrentUser && !isEditing && (
                <Button variant="contained" onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </Button>
              )}
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
              slotProps={{
                input: {
                  readOnly: !(!question?.id || isEditing),
                },
              }}
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
              slotProps={{
                input: {
                  readOnly: !(!question?.id || isEditing),
                },
              }}
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
                    readOnly: !(!question?.id || isEditing),
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
          {(!question?.id || isEditing) && (
            <Stack direction="row" justifyContent="center">
              <DialogActions>
                <Button variant="contained" type="submit">
                  {question?.id
                    ? t('modal-question-form.edit-question-button-span')
                    : t('modal-question-form.ask-question-button-span')}
                </Button>
              </DialogActions>
            </Stack>
          )}
        </Box>
        {question && <AnswerInput question={question} />}
        {question && <AnswersList question={question} />}
      </Container>
    </Dialog>
  );
};

export const useQuestionFormDialog = createDialogHook<DialogQuestionFormProps>(
  (props) => <DialogQuestionForm {...props} />,
);
