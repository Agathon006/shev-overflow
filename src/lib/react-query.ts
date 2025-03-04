import {
  DefaultOptions,
  QueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  },
} satisfies DefaultOptions;

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfigType<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfigType<
  MutationFnType extends (...args: any) => Promise<any>,
> = MutationFnType extends () => Promise<any>
  ? UseMutationOptions<ApiFnReturnType<MutationFnType>, Error, void>
  : UseMutationOptions<
      ApiFnReturnType<MutationFnType>,
      Error,
      Parameters<MutationFnType>[0]
    >;
