import { createRouter } from '@tanstack/react-router';

import { Page404 } from '@/components/Page404';
import { Spinner } from '@/components/Spinner';
import { queryClient } from '@/lib/react-query';
import { routeTree } from '@/routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultNotFoundComponent: Page404,
  defaultPendingComponent: Spinner,
});
