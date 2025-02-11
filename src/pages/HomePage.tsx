import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SnippetList } from '@/modules/SnippetList';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        {t('home-page.title')}
      </Typography>
      <SnippetList />
    </Box>
  );
};
