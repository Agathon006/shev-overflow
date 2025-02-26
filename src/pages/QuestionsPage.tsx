import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  QuestionEditSchema,
  QuestionsTable,
  useCreateQuestion,
} from '@/modules/Questions';
import { useQuestionFormDialog } from '@/modules/Questions';
import { notify } from '@/utils/notify';

export const QuestionsPage = () => {
  const { t } = useTranslation();

  const [openQuestionFormDialog, closeQuestionFormDialog] =
    useQuestionFormDialog();

  const { mutate: createQuestion, isPending: isCreating } = useCreateQuestion({
    mutationConfig: {
      onSuccess: () => {
        notify({
          type: 'success',
          title: t('api.question-edit-form.created-question'),
        });
      },
    },
  });

  const handleSubmit = (
    data: QuestionEditSchema,
    setIsEditing?: (value: boolean) => void,
    reset?: () => void,
  ) => {
    createQuestion(data, {
      onSuccess: () => {
        setIsEditing?.(false);
        reset?.();
        closeQuestionFormDialog();
      },
    });
  };

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
        mx={4}
      >
        <Typography variant="h4" sx={{ textAlign: 'left' }}>
          {t('questions-page.title')}
        </Typography>
        <Button
          disabled={isCreating}
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() =>
            openQuestionFormDialog({
              defaultValues: { title: '', description: '', attachedCode: '' },
              onSubmit: handleSubmit,
            })
          }
        >
          {t('questions-page.create-question')}
        </Button>
      </Stack>
      <QuestionsTable />
    </Box>
  );
};
