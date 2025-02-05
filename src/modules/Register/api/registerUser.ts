import { api } from '@/api/axiosInstance';

import { RegisterFormInputs } from '../Register';

type ApiError = {
  message: string;
  statusCode?: number;
};

export const registerUser = async (
  credentials: Omit<RegisterFormInputs, 'confirmPassword'>,
) => {
  try {
    const response = await api.post('/register', credentials);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
