import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Register page" />;
}
