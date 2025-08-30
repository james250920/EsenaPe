import React from 'react';
import { Home, Users, BookOpen, MessageCircle, Star, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen }) => {
  const { logout } = useAuth();

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'matching', name: 'Matching', icon: Users },
    { id: 'subjects', name: 'Materias', icon: BookOpen },
    { id: 'messages', name: 'Mensajes', icon: MessageCircle },
    { id: 'reviews', name: 'Reseñas', icon: Star },
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'settings', name: 'Configuración', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => onTabChange(activeTab)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};