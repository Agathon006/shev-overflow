import { createFileRoute } from '@tanstack/react-router';

import { CreatePostPage } from '@/pages/CreatePostPage';

export const Route = createFileRoute('/_authenticated/posts/create')({
  component: CreatePostPage,
});
