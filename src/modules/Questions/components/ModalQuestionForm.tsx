import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { QuestionSchema } from '@/schemas/question';

import {
  QuestionEditSchema,
  questionEditSchema,
} from '../schemas/questionEdit';

type ModalQuestionFormProps = {
  open: boolean;
  onClose: () => void;
  questionId?: QuestionSchema['id'];
  defaultValues?: Partial<QuestionEditSchema>;
  onSubmit: (data: QuestionEditSchema) => void;
  isSubmitting?: boolean;
};

export const ModalQuestionForm = ({
  open,
  onClose,
  questionId,
  defaultValues,
  onSubmit,
  isSubmitting,
}: ModalQuestionFormProps) => {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionEditSchema>({
    resolver: zodResolver(questionEditSchema),
    defaultValues: defaultValues ?? { title: '', description: '', code: '' },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleFormSubmit = (data: QuestionEditSchema) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog
      open={open}
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
        <Stack direction="column" spacing={2} mb={3} mx={4}>
          <Typography variant="h6">
            {t('modal-question-form.title-span')}
          </Typography>
          <TextField
            label={t('modal-question-form.title-input-placeholder')}
            type="text"
            fullWidth
            margin="normal"
            {...register('title')}
            error={!!errors.title}
            helperText={
              errors.title ? t('modal-question-form.error.title-message') : null
            }
          />
          <Typography variant="h6">
            {t('modal-question-form.description-span')}
          </Typography>
          <TextField
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
            name="code"
            control={control}
            render={({ field: { onChange, value } }) => (
              <MonacoEditor
                height="400px"
                theme="vs-dark"
                value={value}
                onChange={(val) => onChange(val)}
                options={{
                  selectOnLineNumbers: true,
                  automaticLayout: true,
                  lineNumbers: 'on',
                  minimap: { enabled: false },
                  padding: { top: 10 },
                  readOnly: isSubmitting,
                }}
              />
            )}
          />
          {errors.code && (
            <Typography color="error">
              {t('modal-question-form.error.code-message')}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" justifyContent="center">
          <DialogActions>
            <Button disabled={isSubmitting} variant="contained" type="submit">
              {questionId
                ? t('modal-question-form.edit-question-button-span')
                : t('modal-question-form.ask-question-button-span')}
            </Button>
          </DialogActions>
        </Stack>
      </Box>
    </Dialog>
  );
};
