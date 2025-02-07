import { queryClient } from '@/App';

export const isAuthenticated = () => {
  return !!queryClient.getQueryData(['currentUser']);
};
