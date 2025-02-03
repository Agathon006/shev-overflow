import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/questions/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Create Question page" />;
}
