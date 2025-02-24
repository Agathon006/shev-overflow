import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ModalQuestionForm, QuestionsTable } from '@/modules/Questions';
import { useCreateQuestion } from '@/modules/Questions/api/createQuestion';
import { QuestionEditSchema } from '@/modules/Questions/schemas/questionEdit';
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
        handleCloseModal();
      },
    },
  });

  const handleSubmit = (data: QuestionEditSchema) => {
    createQuestion(data);
  };

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Stack
        position={'relative'}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        mx={4}
      >
        <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
          {t('questions-page.title')}
        </Typography>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          sx={{ position: 'absolute', right: 0, top: 2 }}
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
