import { Box, CircularProgress } from '@mui/material';

export const LocalSpinner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
};
