import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Create post page</div>
}
