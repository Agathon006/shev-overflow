import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/users/me/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Account page" />;
}
