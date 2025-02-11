import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Users page" />;
}
