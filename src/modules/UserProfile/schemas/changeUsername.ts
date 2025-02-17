import { z } from 'zod';

import { usernameSchema } from '@/schemas/username';

export const changeUsernameSchema = z.object({ username: usernameSchema });

export type ChangeUsernameSchema = z.infer<typeof changeUsernameSchema>;
