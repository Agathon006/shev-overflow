import { ZodSchema } from 'zod';

export const parseEnv = <T>(
  env: Record<string, string>,
  schema: ZodSchema<T>,
): T => {
  const envVars = Object.entries(env).reduce<Record<string, string>>(
    (acc, curr) => {
      const [key, value] = curr;

      if (key.startsWith('VITE_')) {
        acc[key.replace('VITE_', '')] = value;
      }

      return acc;
    },
    {},
  );

  const parsedEnv = schema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided. The following variables are missing or invalid: ${Object.entries(
        parsedEnv.error.flatten().fieldErrors,
      )
        .map(([key, value]) => `- ${key}: ${value}`)
        .join('\n')}
      `,
    );
  }

  return parsedEnv.data;
};
