import { Container } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { snippetByIdQueryOptions, useSnippetById } from '@/api/getSnippetById';
import { Page404 } from '@/components/Page404';
import { Spinner } from '@/components/Spinner';
import { CommentInput, CommentsList } from '@/modules/Comments';
import { SnippetCard } from '@/modules/Snippets';
import { SnippetSchema } from '@/schemas/snippet';

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
          queryClient.invalidateQueries({
            queryKey: snippetByIdQueryOptions(snippet.id).queryKey,
          });
        }}
      />
      <CommentInput snippet={snippet} />
      <CommentsList snippet={snippet} />
    </Container>
  );
};
