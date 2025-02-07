import { createFileRoute, redirect } from '@tanstack/react-router';

import { isAuthenticated } from '@/utils/isAuthenticated';

export const Route = createFileRoute('/questions/')({
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: '/questions/',
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Questions page" />;
}
