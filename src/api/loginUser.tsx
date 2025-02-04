type LoginParams = {
  login: string;
  password: string;
};

type ApiError = {
  message: string;
  statusCode?: number;
};

export const loginUser = async (credentials: LoginParams) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        message: errorData.message || 'Login failed',
        statusCode: response.status,
      } as ApiError;
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw { message: 'Network error. Please try again later.' } as ApiError;
    }
    throw error;
  }
};
