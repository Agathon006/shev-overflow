import { z } from 'zod';

import { questionSchema } from '@/schemas/question';

export const questionEditSchema = z.object({
  title: questionSchema.shape.title.nonempty('Title is required'),
  description: questionSchema.shape.description.nonempty(
    'Description is required',
  ),
  attachedCode: questionSchema.shape.attachedCode.nonempty('Code is required'),
});

export type QuestionEditSchema = z.infer<typeof questionEditSchema>;
