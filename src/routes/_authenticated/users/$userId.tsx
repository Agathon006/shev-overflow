import { createFileRoute } from '@tanstack/react-router';

import { UserPage } from '@/pages/UserPage';

export const Route = createFileRoute('/_authenticated/users/$userId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();

  return <UserPage userId={userId} />;
}
