import { Container } from '@mui/material';

import { Page404 } from '@/components/Page404';
import { Spinner } from '@/components/Spinner';
import { CommentInput, CommentsList } from '@/modules/Comments';
import { SnippetCard, SnippetSchema, useSnippetById } from '@/modules/Snippets';

type PostPageProps = {
  postId: SnippetSchema['id'];
};

export const PostPage = ({ postId }: PostPageProps) => {
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
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <SnippetCard snippet={snippet} />
      <CommentInput snippet={snippet} />
      <CommentsList snippet={snippet} />
    </Container>
  );
};
