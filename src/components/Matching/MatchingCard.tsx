import React, { useState } from 'react';
import { Star, MapPin, CheckCircle, X, Heart } from 'lucide-react';
import { User } from '../../types';

interface MatchingCardProps {
  user: User;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const MatchingCard: React.FC<MatchingCardProps> = ({ user, onSwipe }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX;

    const handleMouseMove = (e: MouseEvent) => {
      const offset = e.clientX - startX;
      setDragOffset(offset);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (Math.abs(dragOffset) > 100) {
        onSwipe(dragOffset > 0 ? 'right' : 'left');
      }
      setDragOffset(0);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      className={`relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden cursor-grab transform transition-transform duration-300 ${
        isDragging ? 'scale-105' : 'hover:scale-102'
      }`}
      style={{ 
        transform: `translateX(${dragOffset}px) ${isDragging ? 'scale(1.02)' : ''}`,
        opacity: isDragging ? 0.9 : 1
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Drag indicators */}
      {isDragging && (
        <>
          <div className={`absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium transform transition-opacity ${
            dragOffset < -50 ? 'opacity-100' : 'opacity-0'
          }`}>
            <X className="h-4 w-4" />
          </div>
          <div className={`absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium transform transition-opacity ${
            dragOffset > 50 ? 'opacity-100' : 'opacity-0'
          }`}>
            <Heart className="h-4 w-4" />
          </div>
        </>
      )}

      {/* Profile Image */}
      <div className="h-64 bg-gradient-to-br from-gray-300 to-gray-400 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">
              {user.firstName[0]}{user.lastName[0]}
            </span>
          </div>
        </div>
        
        {user.isVerified && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full">
            <CheckCircle className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {user.firstName} {user.lastName}
          </h3>
          <span className="text-lg font-bold text-gray-900">{user.year}° año</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{user.university}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{user.major}</p>

        {user.bio && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">{user.bio}</p>
        )}

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{user.rating}</span>
            <span className="text-sm text-gray-500">({user.totalReviews} reseñas)</span>
          </div>
          <div className="ml-auto">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user.level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
              user.level === 'Silver' ? 'bg-gray-100 text-gray-800' :
              user.level === 'Bronze' ? 'bg-orange-100 text-orange-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {user.level}
            </span>
          </div>
        </div>

        {/* Subjects */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Materias que enseña:</h4>
          <div className="flex flex-wrap gap-2">
            {user.subjects.slice(0, 3).map((subject) => (
              <span
                key={subject.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {subject.name}
                <span className="ml-1 text-blue-600">S/ {subject.hourlyRate}/h</span>
              </span>
            ))}
            {user.subjects.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{user.subjects.length - 3} más
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex p-6 pt-0 space-x-4">
        <button
          onClick={() => onSwipe('left')}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <X className="h-5 w-5" />
          <span>Pasar</span>
        </button>
        <button
          onClick={() => onSwipe('right')}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center space-x-2"
        >
          <Heart className="h-5 w-5" />
          <span>Me interesa</span>
        </button>
      </div>
    </div>
  );
};