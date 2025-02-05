import { api } from '@/api/axiosInstance';

import { RegisterFormInputsType } from '../schema/registerSchema';

export const registerUser = async (
  credentials: Omit<RegisterFormInputsType, 'confirmPassword'>,
) => {
  const response = await api.post('/register', credentials);
  return response.data;
};
