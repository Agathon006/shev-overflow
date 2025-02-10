import { createContext, useContext } from 'react';

type User =
  | {
      id: string;
      username: string;
      role: string;
    }
  | null
  | undefined;

interface AuthContextType {
  currentUser: User;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

export const AuthProvider = AuthContext.Provider;

export const useAuthContext = () => useContext(AuthContext);
