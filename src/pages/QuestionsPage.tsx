import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { QuestionsTable } from '@/modules/Questions';

export const QuestionsPage = () => {
  const { t } = useTranslation();

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
        >
          {t('questions-page.create-question')}
        </Button>
      </Stack>
      <QuestionsTable />
    </Box>
  );
};
