import { createFileRoute, redirect } from '@tanstack/react-router';

import { isAuthenticated } from '@/utils/isAuthenticated';

export const Route = createFileRoute('/users/me/')({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: '/users/me/',
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Account page" />;
}
