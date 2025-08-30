export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  university: string;
  major: string;
  year: number;
  profilePicture?: string;
  bio?: string;
  subjects: Subject[];
  learningSubjects: string[];
  rating: number;
  totalReviews: number;
  totalHoursTaught: number;
  level: TutorLevel;
  badges: Badge[];
  isVerified: boolean;
  createdAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  category: string;
  hourlyRate: number;
  experience: string;
  description: string;
  isActive: boolean;
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  user1: User;
  user2: User;
  subject: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Review {
  id: string;
  tutorId: string;
  studentId: string;
  rating: number;
  comment: string;
  subject: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  type: 'text' | 'system';
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export type TutorLevel = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface University {
  id: string;
  name: string;
  emailDomain: string;
  country: string;
  logo?: string;
}