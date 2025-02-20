import { createFileRoute } from '@tanstack/react-router';

import { EditPostPage } from '@/pages/EditPostPage';

export const Route = createFileRoute('/_authenticated/users/me/posts/$postId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return <EditPostPage snippetId={postId} />;
}
