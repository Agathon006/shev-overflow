import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { QuestionSchema } from '@/schemas/question';
import { createDialogHook } from '@/services/dialogService';

import {
  QuestionEditSchema,
  questionEditSchema,
} from '../schemas/questionEdit';

type DialogQuestionFormProps = {
  onClose: () => void;
  question?: QuestionSchema;
  isCurrentUser?: boolean;
  defaultValues?: Partial<QuestionEditSchema>;
  onSubmit: (
    data: QuestionEditSchema,
    setIsEditing?: (value: boolean) => void,
    reset?: () => void,
  ) => void;
};

const DialogQuestionForm = ({
  onClose,
  question,
  isCurrentUser,
  defaultValues,
  onSubmit,
}: DialogQuestionFormProps) => {
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionEditSchema>({
    resolver: zodResolver(questionEditSchema),
    defaultValues: defaultValues ?? {
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

  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        pb={2}
        pt={2}
      >
        {question?.id && isCurrentUser && !isEditing && (
          <Box display="flex" justifyContent="flex-end" mx={4}>
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              <EditIcon />
            </Button>
          </Box>
        )}
        <Stack direction="column" spacing={2} mb={3} mx={4}>
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
              errors.title ? t('modal-question-form.error.title-message') : null
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
    </Dialog>
  );
};

export const useQuestionFormDialog = createDialogHook<DialogQuestionFormProps>(
  (props) => <DialogQuestionForm {...props} />,
);
