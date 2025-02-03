import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/users/me/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Account page" />;
}
