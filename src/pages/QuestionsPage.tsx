import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { QuestionsTable } from '@/modules/Questions';

export const QuestionsPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t('questions-page.title')}
      </Typography>
      <QuestionsTable />
    </Box>
  );
};
