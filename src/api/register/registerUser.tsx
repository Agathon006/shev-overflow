type LoginParams = {
    username: string;
    password: string;
  };
  
  type ApiError = {
    message: string;
    statusCode?: number;
  };
  
  export const registerUser = async (credentials: LoginParams) => {
    console.log(credentials)
    console.log(JSON.stringify(credentials))
    try {
      const response = await fetch('/api/register', {
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
          message: errorData.message || 'Registration failed',
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
  