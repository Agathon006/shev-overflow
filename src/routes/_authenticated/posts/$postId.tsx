import { createFileRoute } from '@tanstack/react-router';

import { PostPage } from '@/pages/PostPage';

export const Route = createFileRoute('/_authenticated/posts/$postId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return <PostPage postId={postId} />;
}
