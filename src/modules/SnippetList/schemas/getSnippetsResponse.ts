import { z } from 'zod';

import { userSchema } from '@/schemas/user';

const snippetsSchema = z.array(
  z.object({
    id: z.string(),
    code: z.string(),
    language: z.string(),
    marks: z
      .array(
        z.object({
          id: z.string(),
          type: z.string(),
          user: userSchema,
        }),
      )
      .nullable(),
    comments: z
      .array(
        z.object({
          id: z.string(),
          content: z.string(),
        }),
      )
      .nullable(),
    user: userSchema,
  }),
);

const snippetsLinksSchema = z.object({
  current: z.string(),
  last: z.string().optional(),
  next: z.string().optional(),
  first: z.string().optional(),
  previous: z.string().optional(),
});

export const snippetsResponseSchema = z.object({
  data: snippetsSchema,
  links: snippetsLinksSchema,
});
