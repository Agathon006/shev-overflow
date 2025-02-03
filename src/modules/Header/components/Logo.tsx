import TerminalIcon from '@mui/icons-material/Terminal';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Logo = () => {
  const { t } = useTranslation();
  return (
    <>
      <TerminalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Link to="/">
        <Typography
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
          {t('header.logo.title')}
        </Typography>
      </Link>
    </>
  );
};
