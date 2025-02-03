import TerminalIcon from '@mui/icons-material/Terminal';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';

export const Logo = () => {
  return (
    <>
      <TerminalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        component={Link}
        to="/"
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Shev Overflow
      </Typography>
    </>
  );
};
