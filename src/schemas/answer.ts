import { z } from 'zod';

export const answerSchema = z.object({
  id: z.string(),
  content: z.string(),
  isCorrect: z.boolean(),
});

export type AnswerSchema = z.infer<typeof answerSchema>;
