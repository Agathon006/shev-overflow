import { api } from '@/api/axiosInstance';

import { LoginFormInputsType } from '../schema/loginSchema';

export const loginUser = async (credentials: LoginFormInputsType) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};
