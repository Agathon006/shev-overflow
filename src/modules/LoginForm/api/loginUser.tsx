import { axiosInstance } from '@/api/axiosInstance';

import { LoginFormInputs } from '../LoginForm';

type ApiError = {
  message: string;
  statusCode?: number;
};

export const loginUser = async (credentials: LoginFormInputs) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
