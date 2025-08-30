import React, { useState, useEffect } from 'react';
import { MatchingCard } from './MatchingCard';
import { User } from '../../types';
import { RefreshCw, Filter } from 'lucide-react';

export const MatchingPage: React.FC = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  // Filters state removed as it was unused

  // Mock users data
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '2',
        email: 'maria.gonzalez@pucp.edu.pe',
        firstName: 'María',
        lastName: 'González',
        university: 'PUCP',
        major: 'Matemáticas',
        year: 4,
        bio: 'Apasionada por las matemáticas y la enseñanza. He ayudado a más de 20 estudiantes.',
        subjects: [
          {
            id: '1',
            name: 'Cálculo',
            category: 'Matemáticas',
            hourlyRate: 30,
            experience: '2 años',
            description: 'Cálculo I, II y III',
            isActive: true,
          },
          {
            id: '2',
            name: 'Álgebra',
            category: 'Matemáticas',
            hourlyRate: 25,
            experience: '1.5 años',
            description: 'Álgebra lineal y abstracta',
            isActive: true,
          },
        ],
        learningSubjects: ['Física'],
        rating: 4.9,
        totalReviews: 18,
        totalHoursTaught: 65,
        level: 'Gold',
        badges: [],
        isVerified: true,
        createdAt: new Date(),
      },
      {
        id: '3',
        email: 'carlos.ruiz@uni.edu.pe',
        firstName: 'Carlos',
        lastName: 'Ruiz',
        university: 'UNI',
        major: 'Ingeniería de Software',
        year: 3,
        bio: 'Desarrollador full-stack con experiencia en múltiples lenguajes de programación.',
        subjects: [
          {
            id: '3',
            name: 'Programación',
            category: 'Tecnología',
            hourlyRate: 35,
            experience: '2 años',
            description: 'Python, Java, JavaScript, React',
            isActive: true,
          },
        ],
        learningSubjects: ['Matemáticas'],
        rating: 4.7,
        totalReviews: 12,
        totalHoursTaught: 30,
        level: 'Silver',
        badges: [],
        isVerified: true,
        createdAt: new Date(),
      },
      {
        id: '4',
        email: 'ana.torres@upc.edu.pe',
        firstName: 'Ana',
        lastName: 'Torres',
        university: 'UPC',
        major: 'Economía',
        year: 2,
        bio: 'Me encanta explicar conceptos económicos de manera simple y práctica.',
        subjects: [
          {
            id: '4',
            name: 'Microeconomía',
            category: 'Economía',
            hourlyRate: 28,
            experience: '1 año',
            description: 'Teoría del consumidor, producción, mercados',
            isActive: true,
          },
          {
            id: '5',
            name: 'Estadística',
            category: 'Matemáticas',
            hourlyRate: 22,
            experience: '6 meses',
            description: 'Estadística descriptiva e inferencial',
            isActive: true,
          },
        ],
        learningSubjects: ['Programación'],
        rating: 4.6,
        totalReviews: 8,
        totalHoursTaught: 15,
        level: 'Bronze',
        badges: [],
        isVerified: true,
        createdAt: new Date(),
      },
    ];
    setUsers(mockUsers);
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    console.log(`Swiped ${direction} on user:`, users[currentUserIndex]);
    
    // Move to next user
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
    } else {
      // Reset or load more users
      setCurrentUserIndex(0);
    }
  };

  const currentUser = users[currentUserIndex];

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <RefreshCw className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay más tutores disponibles</h3>
        <p className="text-gray-600 mb-4">Intenta ajustar tus filtros o vuelve más tarde</p>
        <button
          onClick={() => setCurrentUserIndex(0)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Reiniciar búsqueda
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Descubre tutores</h2>
          <p className="text-gray-600">Encuentra el tutor perfecto para ti</p>
        </div>
        <button className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filtros</span>
        </button>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-2">
        <span className="text-sm text-gray-600">{currentUserIndex + 1} de {users.length}</span>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentUserIndex + 1) / users.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Matching Card */}
      <div className="flex justify-center">
        <MatchingCard user={currentUser} onSwipe={handleSwipe} />
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-500">
        <p>Arrastra la tarjeta o usa los botones para decidir</p>
        <p className="mt-1">❌ Pasar • ❤️ Me interesa</p>
      </div>
    </div>
  );
};