import { Container } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { Page404 } from '@/components/Page404';
import { Spinner } from '@/components/Spinner';
import { CommentInput, CommentsList } from '@/modules/Comments';
import { SnippetCard, SnippetSchema, useSnippetById } from '@/modules/Snippets';

type PostPageProps = {
  postId: SnippetSchema['id'];
};

export const PostPage = ({ postId }: PostPageProps) => {
  const queryClient = useQueryClient();

  const { data: snippet, isLoading } = useSnippetById({ id: postId });

  if (isLoading) {
    return <Spinner />;
  }

  if (!snippet) {
    return <Page404 />;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: '100%',
        marginTop: 2,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <SnippetCard
        snippet={snippet}
        onMark={() => {
          queryClient.invalidateQueries({ queryKey: ['snippet', postId] });
        }}
      />
      <CommentInput snippet={snippet} />
      <CommentsList snippet={snippet} />
    </Container>
  );
};
