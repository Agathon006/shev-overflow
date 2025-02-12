import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SnippetList, SnippetListSearch } from '@/modules/SnippetList';

export const HomePage = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t('home-page.title')}
      </Typography>
      <Container maxWidth="xl" sx={{ width: '100%' }}>
        <SnippetListSearch onSearchChange={handleSearchChange} />
      </Container>
      <SnippetList searchTerm={searchTerm} />
    </Box>
  );
};
