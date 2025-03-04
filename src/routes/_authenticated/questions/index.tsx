import { createFileRoute } from '@tanstack/react-router';

import { QuestionsPage } from '@/pages/QuestionsPage';

export const Route = createFileRoute('/_authenticated/questions/')({
  component: QuestionsPage,
});
