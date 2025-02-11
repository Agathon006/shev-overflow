import '@tanstack/react-router';

import { router } from '@/lib/react-router';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
