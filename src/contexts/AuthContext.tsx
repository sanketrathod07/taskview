import { createContext, useState, useCallback, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { User } from '../types/user';
import { loginUser, registerUser, logoutUser, getCurrentUser, updateUser } from '../services/authService';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, country?: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateUserData: (userData: Partial<User>) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => { },
  register: async () => { },
  logout: () => { },
  checkAuth: async () => { },
  updateUserData: () => { },
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await loginUser(email, password);
      setUser(userData);
      toast.success('Logged in successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, country?: string) => {
    try {
      setIsLoading(true);
      const userData = await registerUser(name, email, password, country);
      setUser(userData);
      toast.success('Account created successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUserData = async (userData: Partial<User>) => {
    if (!user) {
      console.error('User is null, cannot update user data');
      return;
    }

    try {
      console.log('Updating user data:', userData);
      const updatedUser = await updateUser(userData);
      setUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update user at AuthContext:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        checkAuth,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};