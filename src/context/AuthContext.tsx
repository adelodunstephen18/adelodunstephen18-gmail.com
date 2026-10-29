import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, phoneOrPassword?: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: { name: string; email: string; phone: string; address?: string; city?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  recordOrder: (itemsSummary: string, totalAmount: number) => void;
}

const STORAGE_KEY = 'adelod_user_profile';
const USERS_DB_KEY = 'adelod_registered_users';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const rawUsers = localStorage.getItem(USERS_DB_KEY);
      const users: UserProfile[] = rawUsers ? JSON.parse(rawUsers) : [];
      const trimmedEmail = email.trim().toLowerCase();

      const found = users.find((u) => u.email.toLowerCase() === trimmedEmail || u.phone.includes(trimmedEmail));
      if (found) {
        setCurrentUser(found);
        setIsAuthModalOpen(false);
        return { success: true };
      }

      // If logging in for the first time with any valid email, create session
      if (trimmedEmail.includes('@')) {
        const namePart = trimmedEmail.split('@')[0];
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        const newUser: UserProfile = {
          id: 'user-' + Date.now(),
          name: formattedName + ' (Gamer)',
          email: trimmedEmail,
          phone: '080' + Math.floor(10000000 + Math.random() * 90000000),
          tier: 'Regular Gamer',
          registeredAt: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
          savedOrders: [],
        };
        users.push(newUser);
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
        setCurrentUser(newUser);
        setIsAuthModalOpen(false);
        return { success: true };
      }

      return { success: false, message: 'Please enter a valid email address or registered Nigerian phone number.' };
    } catch (e) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
  }): Promise<{ success: boolean; message?: string }> => {
    try {
      if (!data.name.trim() || !data.email.trim() || !data.phone.trim()) {
        return { success: false, message: 'Name, email, and phone number are required.' };
      }

      const rawUsers = localStorage.getItem(USERS_DB_KEY);
      const users: UserProfile[] = rawUsers ? JSON.parse(rawUsers) : [];
      const trimmedEmail = data.email.trim().toLowerCase();

      const existingIndex = users.findIndex((u) => u.email.toLowerCase() === trimmedEmail);
      const newUser: UserProfile = {
        id: 'user-' + Date.now(),
        name: data.name.trim(),
        email: trimmedEmail,
        phone: data.phone.trim(),
        address: data.address?.trim() || 'Ibadan, Oyo State',
        city: data.city?.trim() || 'Ibadan',
        tier: 'VIP Pro Member',
        registeredAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        savedOrders: [],
      };

      if (existingIndex >= 0) {
        users[existingIndex] = newUser;
      } else {
        users.push(newUser);
      }

      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
      setCurrentUser(newUser);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch {
      return { success: false, message: 'Account creation failed. Please try again.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      return updated;
    });
  };

  const recordOrder = (itemsSummary: string, totalAmount: number) => {
    if (!currentUser) return;
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: itemsSummary,
      totalAmount,
      status: 'Confirmed' as const,
    };
    setCurrentUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        savedOrders: [newOrder, ...(prev.savedOrders || [])],
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        recordOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
