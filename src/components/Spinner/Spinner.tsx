import { Box, CircularProgress } from '@mui/material';

export const Spinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      minHeight={'10vh'}
    >
      <CircularProgress />
    </Box>
  );
};
