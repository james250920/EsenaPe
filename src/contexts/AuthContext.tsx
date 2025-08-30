import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  university: string;
  major: string;
  year: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      email,
      firstName: 'Juan',
      lastName: 'Pérez',
      university: 'PUCP',
      major: 'Ingeniería de Sistemas',
      year: 3,
      bio: 'Estudiante apasionado por la programación y las matemáticas',
      subjects: [
        {
          id: '1',
          name: 'Programación',
          category: 'Tecnología',
          hourlyRate: 25,
          experience: '2 años',
          description: 'Python, JavaScript, React',
          isActive: true,
        },
        {
          id: '2',
          name: 'Matemáticas',
          category: 'Ciencias',
          hourlyRate: 20,
          experience: '1 año',
          description: 'Cálculo, Álgebra, Estadística',
          isActive: true,
        },
      ],
      learningSubjects: ['Física', 'Química'],
      rating: 4.8,
      totalReviews: 24,
      totalHoursTaught: 45,
      level: 'Silver',
      badges: [
        {
          id: '1',
          name: 'Primer Tutor',
          description: 'Completaste tu primera clase como tutor',
          icon: '🎓',
          color: '#059669',
        },
      ],
      isVerified: true,
      createdAt: new Date(),
    };

    setUser(mockUser);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      subjects: [],
      learningSubjects: [],
      rating: 0,
      totalReviews: 0,
      totalHoursTaught: 0,
      level: 'Bronze',
      badges: [],
      isVerified: false,
      createdAt: new Date(),
    };

    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};