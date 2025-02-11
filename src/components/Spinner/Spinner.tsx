import { Box, CircularProgress } from '@mui/material';

export const Spinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
};
