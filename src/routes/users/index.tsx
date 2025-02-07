import { createFileRoute, redirect } from '@tanstack/react-router';

import { isAuthenticated } from '@/utils/isAuthenticated';

export const Route = createFileRoute('/users/')({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: '/users/',
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Users page" />;
}
