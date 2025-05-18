
import { create } from 'zustand';
import { toast } from '@/components/ui/sonner';

// This is a simplified auth store
// In a real application, you would integrate with a backend service
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Simulated user database for demo purposes
// In a real app, this would be replaced with actual backend calls
const mockUsers: Record<string, { id: string; email: string; password: string; name: string }> = {};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user exists and password matches
      const userKey = Object.keys(mockUsers).find(key => mockUsers[key].email === email);
      
      if (!userKey || mockUsers[userKey].password !== password) {
        throw new Error('Invalid email or password');
      }
      
      const user = {
        id: mockUsers[userKey].id,
        email: mockUsers[userKey].email,
        name: mockUsers[userKey].name,
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem('ev-finder-user', JSON.stringify(user));
      
      set({ user, isAuthenticated: true, isLoading: false });
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      set({ isLoading: false });
    }
  },
  
  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists
      if (Object.values(mockUsers).some(user => user.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const id = `user_${Date.now()}`;
      mockUsers[id] = {
        id,
        email,
        password,
        name,
      };
      
      const user = {
        id,
        email,
        name,
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem('ev-finder-user', JSON.stringify(user));
      
      set({ user, isAuthenticated: true, isLoading: false });
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
      set({ isLoading: false });
    }
  },
  
  logout: () => {
    localStorage.removeItem('ev-finder-user');
    set({ user: null, isAuthenticated: false });
    toast.info('Logged out successfully');
  },
}));

// Initialize auth state from localStorage
export const initAuth = () => {
  const storedUser = localStorage.getItem('ev-finder-user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser) as User;
      useAuth.setState({ user, isAuthenticated: true });
    } catch (e) {
      localStorage.removeItem('ev-finder-user');
    }
  }
};
