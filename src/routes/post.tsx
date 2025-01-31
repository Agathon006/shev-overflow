import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Post page</div>
}
