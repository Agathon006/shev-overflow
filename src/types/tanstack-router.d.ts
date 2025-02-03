import '@tanstack/react-router';

import { router } from '@/App';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
