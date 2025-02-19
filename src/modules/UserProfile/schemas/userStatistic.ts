import { z } from 'zod';

export const statisticSchema = z.object({
  rating: z.number(),
  commentsCount: z.number(),
  correctAnswersCount: z.number(),
  dislikesCount: z.number(),
  likesCount: z.number(),
  questionsCount: z.number(),
  regularAnswersCount: z.number(),
  snippetsCount: z.number(),
});

export type StatisticSchema = z.infer<typeof statisticSchema>;
