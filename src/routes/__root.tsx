import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { AppBanner } from '../modules/AppBanner';

export const Route = createRootRoute({
  component: () => (
    <>
      <AppBanner />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
