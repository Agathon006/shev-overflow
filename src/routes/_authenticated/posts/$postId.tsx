import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/posts/$postId')({
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
  return <img src="" alt={'Post page, ID: ' + { postId }} />
}
