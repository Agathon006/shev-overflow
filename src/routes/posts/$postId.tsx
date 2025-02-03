import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  //   loader: ({ params }) => fetchPost(params.postId),
  loader: async ({ params }: { params: { postId: string } }) => {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve({ id: params.postId, title: 'Mock Post Title' }),
        500,
      )
    })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = Route.useParams()
  return <div>Post page, ID: {postId}</div>
}
