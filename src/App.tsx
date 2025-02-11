import '@/styles/index.scss';
import '@/i18n';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import React from 'react';

import { Notifications } from '@/components/Notifications';
import { queryClient } from '@/lib/react-query';
import { router } from '@/lib/react-router';
import { defaultTheme } from '@/theme';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <Notifications />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

// TODO env.example

// import { ZodSchema } from "zod";

// export const parseEnv = <T>(env: Record<string, string>, schema: ZodSchema<T>): T => {
//   const envVars = Object.entries(env).reduce<Record<string, string>>((acc, curr) => {
//     const [key, value] = curr;

//     if (key.startsWith("VITE_")) {
//       acc[key.replace("VITE_", "")] = value;
//     }

//     return acc;
//   }, {});

//   const parsedEnv = schema.safeParse(envVars);

//   if (!parsedEnv.success) {
//     throw new Error(
//       `Invalid env provided. The following variables are missing or invalid: ${Object.entries(
//         parsedEnv.error.flatten().fieldErrors
//       )
//         .map(([key, value]) => `- ${key}: ${value}`)
//         .join("\n")}
//       `
//     );
//   }

//   return parsedEnv.data;
// };
