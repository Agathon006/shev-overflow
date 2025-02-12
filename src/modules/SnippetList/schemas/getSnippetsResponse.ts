import { z } from 'zod';

export const snippetsResponseSchema = z.array(
  z.object({
    id: z.string(),
    code: z.string(),
    language: z.string(),
    marks: z
      .array(
        z.object({
          id: z.string(),
          type: z.string(),
          user: z.object({
            id: z.string(),
            role: z.string(),
            username: z.string(),
          }),
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
    user: z.object({
      id: z.string(),
      role: z.string(),
      username: z.string(),
    }),
  }),
);

export type SnippetsResponseSchema = z.infer<typeof snippetsResponseSchema>;

export const snippetsLinksResponseSchema = z.object({
  current: z.string(),
  last: z.string().optional(),
  next: z.string().optional(),
  first: z.string().optional(),
  previous: z.string().optional(),
});

export type SnippetsLinksResponseSchema = z.infer<
  typeof snippetsLinksResponseSchema
>;
