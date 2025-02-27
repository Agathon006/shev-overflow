import { Box, Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { useQuestionById } from '@/api/getQuestionById';
import { Page404 } from '@/components/Page404';
import { Spinner } from '@/components/Spinner';
import { YesNoLabel } from '@/components/YesNoLabel';
import { AnswerInput, AnswersList } from '@/modules/Answers';
import { QuestionSchema } from '@/schemas/question';

type QuestionPageProps = {
  questionId: QuestionSchema['id'];
};

export const QuestionPage = ({ questionId }: QuestionPageProps) => {
  const { t } = useTranslation();

  const { data: question, isLoading } = useQuestionById({ id: questionId });

  if (isLoading) {
    return <Spinner />;
  }

  if (!question) {
    return <Page404 />;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: '100%',
        marginTop: 2,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {t('questions-table.header.is-resolved')}
            {': '}
            {question?.isResolved ? <YesNoLabel truth /> : <YesNoLabel />}
          </Typography>
        </Box>
        <Stack direction="column" spacing={2} mb={1}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {t('modal-question-form.title-span')}
          </Typography>
          <Typography variant="h6">{question.title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {t('modal-question-form.description-span')}
          </Typography>
          <Typography variant="h6">{question.description}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {t('modal-question-form.code-span')}
          </Typography>
          <SyntaxHighlighter wrapLines={true} showLineNumbers={true}>
            {question.attachedCode}
          </SyntaxHighlighter>
        </Stack>
      </Box>
      <AnswerInput question={question} />
      <AnswersList question={question} />
    </Container>
  );
};
