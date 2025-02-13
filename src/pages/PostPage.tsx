import { Container } from '@mui/material';

import { Page404 } from '@/components/Page404';
import { Spinner } from '@/components/Spinner';
import { SnippetCard } from '@/modules/Snippets';
import { useSnippetById } from '@/modules/Snippets/api/snippetById';
import { SnippetSchema } from '@/modules/Snippets/schemas/snippet';

type PostPageProps = {
  postId: SnippetSchema['id'];
};

export const PostPage = ({ postId }: PostPageProps) => {
  const { data: snippet, isLoading } = useSnippetById({ id: postId });

  let topContent = null;
  if (isLoading) {
    topContent = <Spinner />;
  } else if (!snippet) {
    topContent = <Page404 />;
  } else {
    topContent = <SnippetCard snippet={snippet} />;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ width: '100%', marginTop: 2, marginBottom: 2 }}
    >
      {topContent}
    </Container>
  );
};
