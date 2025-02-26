import { Alert, Box, Container, Paper, Typography } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { QuestionSchema } from '@/schemas/question';

import { AnswerItem } from './AnswerItem';

export const AnswersList = ({ question }: { question: QuestionSchema }) => {
  const { t } = useTranslation();
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: question.answers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 5,
  });

  if (question.answers.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ width: '100%', marginBottom: 2 }}>
        <Alert severity="info">{t('answers.no-answers')}</Alert>
      </Container>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        maxHeight: '50vh',
        overflow: 'auto',
        width: '100%',
        marginBottom: 2,
      }}
      ref={parentRef}
    >
      <Typography variant="h6" gutterBottom>
        {t('answers.title')}
      </Typography>
      <Box
        sx={{
          position: 'relative',
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const answer = question.answers[virtualRow.index];
          return (
            <Box
              key={answer.id}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
                pb: 2,
              }}
            >
              <AnswerItem answer={answer} questionId={question.id} />
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
