import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/questions/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <img src="" alt="Questions page" />;
}
