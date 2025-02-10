import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/users/me/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="My posts page" />;
}
