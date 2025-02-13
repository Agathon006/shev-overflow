import { Container } from '@mui/material';

import { Page404 } from '@/components/Page404';
import { Spinner } from '@/components/Spinner';
import { CommentsList } from '@/modules/Comments';
import { SnippetCard } from '@/modules/Snippets';
import { useSnippetById } from '@/modules/Snippets/api/snippetById';
import { SnippetSchema } from '@/modules/Snippets/schemas/snippet';

type PostPageProps = {
  postId: SnippetSchema['id'];
};

export const PostPage = ({ postId }: PostPageProps) => {
  const { data: snippet, isLoading } = useSnippetById({ id: postId });

  if (isLoading) {
    return <Spinner />;
  } else if (!snippet) {
    return <Page404 />;
  } else {
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
        <CommentsList snippet={snippet} />
      </Container>
    );
  }
};
