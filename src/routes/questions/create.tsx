import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questions/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Create Question page</div>
}
