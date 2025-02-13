import { z } from 'zod';

import { parseEnv } from '../utils/parse-env';

const envSchema = z.object({
  CODELANG_API_URL: z.string().url(),
});

export const env = parseEnv(import.meta.env, envSchema);
