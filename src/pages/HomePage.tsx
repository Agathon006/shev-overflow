import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SnippetList } from '@/modules/Snippets';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, marginBottom: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t('home-page.title')}
      </Typography>
      <SnippetList />
    </Container>
  );
};
