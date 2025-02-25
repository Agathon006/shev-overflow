import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ModalQuestionForm,
  QuestionEditSchema,
  QuestionsTable,
  useCreateQuestion,
} from '@/modules/Questions';
import { notify } from '@/utils/notify';

export const QuestionsPage = () => {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
        handleCloseModal();
        setIsEditing?.(false);
        reset?.();
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
          variant="contained"
          endIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          {t('questions-page.create-question')}
        </Button>
        <ModalQuestionForm
          open={modalOpen}
          onClose={handleCloseModal}
          defaultValues={{ title: '', description: '', attachedCode: '' }}
          onSubmit={handleSubmit}
          isSubmitting={isCreating}
        />
      </Stack>
      <QuestionsTable />
    </Box>
  );
};
