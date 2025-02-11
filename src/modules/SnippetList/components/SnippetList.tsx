import { Box, Container } from '@mui/material';

import { SnippetCard } from '@/components/SnippetCard';

const expProps = {
  username: 'someone',
  language: 'javascript',
  code: 'let a = "abc"',
  likes: 4,
  dislikes: 2,
  comments: 3,
};

export const SnippetList = () => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <SnippetCard {...expProps} />
        <SnippetCard {...expProps} />
        <SnippetCard {...expProps} />
      </Box>
    </Container>
  );
};
