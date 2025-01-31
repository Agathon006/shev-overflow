import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/me/posts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>My posts page</div>
}
