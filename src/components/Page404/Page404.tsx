import { Box, Button, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Page404 = () => {
  const { t } = useTranslation();
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        {t('page404.title')}
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        {t('page404.button-text')}
      </Button>
    </Box>
  );
};
