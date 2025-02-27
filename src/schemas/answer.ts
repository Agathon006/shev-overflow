import { z } from 'zod';

import { userSchema } from './user';

export const answerSchema = z.object({
  id: z.string(),
  content: z.string(),
  isCorrect: z.boolean(),
  user: userSchema,
});

export type AnswerSchema = z.infer<typeof answerSchema>;
