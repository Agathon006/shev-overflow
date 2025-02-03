import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@tanstack/react-router';

export const NavMenu = () => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button key="Home" sx={{ my: 2, color: 'inherit', display: 'block' }}>
        <Link to="/">Home</Link>
      </Button>
      <Button key="Users" sx={{ my: 2, color: 'inherit', display: 'block' }}>
        <Link to="/users">Users</Link>
      </Button>
      <Button
        key="Questions"
        sx={{ my: 2, color: 'inherit', display: 'block' }}
      >
        <Link to="/questions">Questions</Link>
      </Button>
    </Box>
  );
};
