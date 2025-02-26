import { z } from 'zod';

import { userSchema } from '@/schemas/user';

import { answerSchema } from './answer';

export const questionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  attachedCode: z.string(),
  user: userSchema,
  answers: answerSchema.array(),
  isResolved: z.boolean(),
});

export type QuestionSchema = z.infer<typeof questionSchema>;
