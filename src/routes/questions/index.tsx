import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Questions page</div>
}
