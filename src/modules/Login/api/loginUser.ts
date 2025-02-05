import { api } from '@/api/axiosInstance';

import { LoginFormInputs } from '../Login';

type ApiError = {
  message: string;
  statusCode?: number;
};

export const loginUser = async (credentials: LoginFormInputs) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
