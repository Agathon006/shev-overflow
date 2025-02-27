import { createFileRoute } from '@tanstack/react-router'

import { QuestionPage } from '@/pages/QuestionPage'

export const Route = createFileRoute('/_authenticated/questions/$questionId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { questionId } = Route.useParams()

  return <QuestionPage questionId={questionId} />
}
