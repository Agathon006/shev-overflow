import { createFileRoute, redirect } from '@tanstack/react-router';

import { isAuthenticated } from '@/utils/isAuthenticated';

export const Route = createFileRoute('/questions/create')({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: '/questions/create/',
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Create Question page" />;
}
