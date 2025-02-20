import { createFileRoute } from '@tanstack/react-router';

import { MyPostsPage } from '@/pages/MyPosts';

export const Route = createFileRoute('/_authenticated/users/me/posts/')({
  component: MyPostsPage,
});
