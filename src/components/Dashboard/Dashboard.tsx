import React from 'react';
import { BookOpen, Users, Star, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Horas enseñadas',
      value: user?.totalHoursTaught || 0,
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      name: 'Estudiantes ayudados',
      value: '12',
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      name: 'Calificación promedio',
      value: user?.rating?.toFixed(1) || '0.0',
      icon: Star,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      name: 'Ganancias este mes',
      value: 'S/ 450',
      icon: DollarSign,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  const recentActivity = [
    { id: 1, type: 'class', student: 'María González', subject: 'Matemáticas', time: '2 horas', status: 'completed' },
    { id: 2, type: 'match', student: 'Carlos Ruiz', subject: 'Programación', time: '30 min', status: 'pending' },
    { id: 3, type: 'review', student: 'Ana Torres', subject: 'Estadística', time: '1 día', status: 'new' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          ¡Hola, {user?.firstName}! 👋
        </h1>
        <p className="text-blue-100 text-lg">
          Tienes 3 solicitudes de tutorías pendientes y 2 clases programadas para hoy.
        </p>
        <div className="mt-6 flex space-x-4">
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Ver solicitudes
          </button>
          <button className="border border-blue-400 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Mi calendario
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Actividad reciente</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.student}</p>
                      <p className="text-sm text-gray-600">{activity.subject}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Acciones rápidas</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Buscar nuevos estudiantes</span>
                </div>
                <TrendingUp className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-900">Agregar nueva materia</span>
                </div>
                <TrendingUp className="h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Programar disponibilidad</span>
                </div>
                <TrendingUp className="h-5 w-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Progreso de Tutor</h3>
          <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
            Nivel {user?.level}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full" style={{ width: '65%' }}></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          15 horas más para alcanzar el nivel Gold y desbloquear beneficios premium
        </p>
      </div>
    </div>
  );
};