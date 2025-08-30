import React, { useState } from 'react';
import { Camera, MapPin, GraduationCap, Star, Award, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    bio: user?.bio || '',
    major: user?.major || '',
    year: user?.year || 1,
  });

  const handleSave = () => {
    console.log('Saving profile changes:', editData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            <div className="relative -mt-16 mb-4 sm:mb-0">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-600">
                  {user.firstName[0]}{user.lastName[0]}
                </span>
              </div>
              <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  <span className="text-sm font-medium">
                    {isEditing ? 'Cancelar' : 'Editar perfil'}
                  </span>
                </button>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{user.university}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <GraduationCap className="h-4 w-4 mr-1" />
                <span>{user.major} • {user.year}° año</span>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{user.rating}</span>
                  <span className="text-gray-500">({user.totalReviews} reseñas)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Nivel {user.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información personal</h3>
          
          {isEditing ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biografía
                </label>
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Cuéntanos sobre ti, tu experiencia y pasiones..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carrera
                </label>
                <input
                  type="text"
                  value={editData.major}
                  onChange={(e) => setEditData(prev => ({ ...prev, major: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Año de estudios
                </label>
                <select
                  value={editData.year}
                  onChange={(e) => setEditData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map(year => (
                    <option key={year} value={year}>{year}° año</option>
                  ))}
                </select>
              </div>
              
              <button
                type="button"
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Guardar cambios</span>
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Biografía</h4>
                <p className="text-gray-900">
                  {user.bio || 'No has agregado una biografía aún.'}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Email universitario</h4>
                <p className="text-gray-900">{user.email}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Fecha de registro</h4>
                <p className="text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats & Achievements */}
        <div className="space-y-6">
          {/* Teaching Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas de enseñanza</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{user.totalHoursTaught}</div>
                <div className="text-sm text-gray-600">Horas enseñadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Estudiantes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{user.rating}</div>
                <div className="text-sm text-gray-600">Calificación</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">S/ 1,250</div>
                <div className="text-sm text-gray-600">Ganado total</div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Insignias</h3>
            <div className="grid grid-cols-3 gap-3">
              {user.badges.map((badge) => (
                <div key={badge.id} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium text-gray-900">{badge.name}</div>
                </div>
              ))}
              <div className="text-center p-3 bg-gray-50 rounded-lg opacity-50">
                <div className="text-2xl mb-1">🏆</div>
                <div className="text-xs font-medium text-gray-500">Próxima insignia</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Materias que enseño</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.subjects.map((subject) => (
            <div key={subject.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-1">{subject.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{subject.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-600 font-medium">S/ {subject.hourlyRate}/h</span>
                <span className="text-gray-500">{subject.experience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};