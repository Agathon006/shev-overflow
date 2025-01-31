import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-posts')({
  component: RouteComponent,
})

function RouteComponent() {
    return <div>My posts page</div>
}
