import { User } from '../types';

const STORAGE_KEY = 'interested_tutors';

export interface InterestedTutor {
  user: User;
  interestedAt: Date;
}

export const interestedTutorsService = {
  // Obtener todos los tutores que te interesan
  getInterestedTutors: (): InterestedTutor[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const tutors = JSON.parse(stored);
      // Convertir las fechas de string a Date
      return tutors.map((t: any) => ({
        ...t,
        interestedAt: new Date(t.interestedAt),
        user: {
          ...t.user,
          createdAt: new Date(t.user.createdAt)
        }
      }));
    } catch (error) {
      console.error('Error al obtener tutores interesados:', error);
      return [];
    }
  },

  // Agregar un tutor a la lista de interesados
  addInterestedTutor: (user: User): void => {
    try {
      const tutors = interestedTutorsService.getInterestedTutors();
      
      // Verificar si ya existe
      const exists = tutors.some(t => t.user.id === user.id);
      if (exists) {
        console.log('El tutor ya está en la lista de interesados');
        return;
      }
      
      const newTutor: InterestedTutor = {
        user,
        interestedAt: new Date()
      };
      
      tutors.unshift(newTutor); // Agregar al inicio
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tutors));
    } catch (error) {
      console.error('Error al agregar tutor interesado:', error);
    }
  },

  // Eliminar un tutor de la lista
  removeInterestedTutor: (userId: string): void => {
    try {
      const tutors = interestedTutorsService.getInterestedTutors();
      const filtered = tutors.filter(t => t.user.id !== userId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error al eliminar tutor interesado:', error);
    }
  },

  // Verificar si un tutor está en la lista
  isTutorInterested: (userId: string): boolean => {
    const tutors = interestedTutorsService.getInterestedTutors();
    return tutors.some(t => t.user.id === userId);
  },

  // Limpiar todos los tutores
  clearAllInterestedTutors: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error al limpiar tutores interesados:', error);
    }
  },

  // Obtener el conteo de tutores interesados
  getInterestedCount: (): number => {
    return interestedTutorsService.getInterestedTutors().length;
  }
};
