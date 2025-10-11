import React, { useState, useEffect } from 'react';
import { Heart, X, Star, MapPin, CheckCircle, MessageCircle, Trash2, RefreshCw } from 'lucide-react';
import { interestedTutorsService, InterestedTutor } from '../../services/interestedTutors';

export const NotificationPage: React.FC = () => {
  const [interestedTutors, setInterestedTutors] = useState<InterestedTutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInterestedTutors();
  }, []);

  const loadInterestedTutors = () => {
    setIsLoading(true);
    const tutors = interestedTutorsService.getInterestedTutors();
    setInterestedTutors(tutors);
    setIsLoading(false);
  };

  const handleRemoveTutor = (userId: string) => {
    interestedTutorsService.removeInterestedTutor(userId);
    loadInterestedTutors();
  };

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los tutores de tu lista?')) {
      interestedTutorsService.clearAllInterestedTutors();
      loadInterestedTutors();
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Hace un momento';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    
    return date.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tutores que te interesan</h2>
          <p className="text-gray-600 mt-1">
            {interestedTutors.length} {interestedTutors.length === 1 ? 'tutor guardado' : 'tutores guardados'}
          </p>
        </div>
        {interestedTutors.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Limpiar todo</span>
          </button>
        )}
      </div>

      {/* Empty state */}
      {interestedTutors.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-center bg-white rounded-2xl shadow-sm p-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes tutores guardados</h3>
          <p className="text-gray-600 mb-6 max-w-sm">
            Cuando encuentres un tutor que te interese en el Matching, aparecerá aquí para que puedas contactarlo más tarde.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {interestedTutors.map(({ user, interestedAt }) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Profile Header */}
              <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-gray-700">
                      {user.firstName[0]}{user.lastName[0]}
                    </span>
                  </div>
                </div>
                
                {user.isVerified && (
                  <div className="absolute top-3 right-3 bg-white text-blue-600 p-1.5 rounded-full shadow">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}

                <button
                  onClick={() => handleRemoveTutor(user.id)}
                  className="absolute top-3 left-3 bg-white text-gray-600 hover:text-red-600 p-1.5 rounded-full shadow hover:shadow-md transition-all"
                  title="Eliminar de la lista"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {user.firstName} {user.lastName}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                    user.level === 'Silver' ? 'bg-gray-100 text-gray-800' :
                    user.level === 'Bronze' ? 'bg-orange-100 text-orange-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {user.level}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="truncate">{user.university}</span>
                </div>

                <p className="text-gray-600 text-sm mb-3 truncate">{user.major} - {user.year}° año</p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium text-gray-900">{user.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({user.totalReviews})</span>
                </div>

                {/* Subjects */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">Materias:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.subjects.slice(0, 2).map((subject) => (
                      <span
                        key={subject.id}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700"
                      >
                        {subject.name}
                      </span>
                    ))}
                    {user.subjects.length > 2 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                        +{user.subjects.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Time saved */}
                <p className="text-xs text-gray-500 mb-3">
                  <Heart className="h-3 w-3 inline mr-1 text-red-500" />
                  Guardado {formatDate(interestedAt)}
                </p>

                {/* Action button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Contactar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
