import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Create post page" />;
}
