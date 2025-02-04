import { axiosInstance } from '@/api/axiosInstance';

import { RegisterFormInputs } from '../RegisterForm';

type ApiError = {
  message: string;
  statusCode?: number;
};

export const registerUser = async (
  credentials: Omit<RegisterFormInputs, 'confirmPassword'>,
) => {
  try {
    const response = await axiosInstance.post('/register', credentials);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
