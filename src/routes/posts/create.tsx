import { createFileRoute, redirect } from '@tanstack/react-router';

import { isAuthenticated } from '@/utils/isAuthenticated';

export const Route = createFileRoute('/posts/create')({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: '/posts/create/',
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Create post page" />;
}
