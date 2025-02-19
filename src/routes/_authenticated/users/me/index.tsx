import { createFileRoute } from '@tanstack/react-router';

import { AccountPage } from '@/pages/AccountPage';

export const Route = createFileRoute('/_authenticated/users/me/')({
  component: AccountPage,
});
