import { z } from 'zod';

export const snippetsResponseSchema = z
  .object({
    id: z.string(),
    code: z.string(),
    language: z.string(),
    marks: z.array(
      z.object({
        id: z.number(),
        type: z.string(),
        user: z.object({
          id: z.number(),
          role: z.string(),
          username: z.string(),
        }),
      }),
    ),
    user: z.object({
      id: z.number(),
      role: z.string(),
      username: z.string(),
    }),
  })
  .nullable();

export type SnippetsResponseSchema = z.infer<typeof snippetsResponseSchema>;

export const snippetsLinksResponseSchema = z
  .object({
    current: z.string(),
    first: z.string(),
    last: z.string(),
    next: z.string(),
    previous: z.string(),
  })
  .nullable();

export type SnippetsLinksResponseSchema = z.infer<
  typeof snippetsResponseSchema
>;
