import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@tanstack/react-router';

export const NavMenu = () => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button
        component={Link}
        to="/"
        key="Home"
        sx={{ my: 2, color: 'inherit', display: 'block' }}
      >
        Home
      </Button>
      <Button
        component={Link}
        to="/users"
        key="Users"
        sx={{ my: 2, color: 'inherit', display: 'block' }}
      >
        Users
      </Button>
      <Button
        component={Link}
        to="/questions"
        key="Questions"
        sx={{ my: 2, color: 'inherit', display: 'block' }}
      >
        Questions
      </Button>
    </Box>
  );
};
