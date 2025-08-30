import React, { useState } from 'react';
import { Search, Video, Phone, MoreVertical, Send } from 'lucide-react';
import { Message, Match } from '../../types';

export const MessagesPage: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');

  const matches: Match[] = [
    {
      id: '1',
      user1Id: '1',
      user2Id: '2',
      user1: {} as any,
      user2: {
        id: '2',
        firstName: 'María',
        lastName: 'González',
        university: 'PUCP',
        major: 'Matemáticas',
        isVerified: true,
      } as any,
      subject: 'Cálculo',
      status: 'accepted',
      createdAt: new Date(),
    },
    {
      id: '2',
      user1Id: '1',
      user2Id: '3',
      user1: {} as any,
      user2: {
        id: '3',
        firstName: 'Carlos',
        lastName: 'Ruiz',
        university: 'UNI',
        major: 'Ingeniería de Software',
        isVerified: true,
      } as any,
      subject: 'Programación',
      status: 'accepted',
      createdAt: new Date(),
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      matchId: '1',
      senderId: '2',
      content: '¡Hola! Vi que necesitas ayuda con cálculo. ¿Cuándo te gustaría empezar?',
      type: 'text',
      createdAt: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      matchId: '1',
      senderId: '1',
      content: 'Hola María! Me vendría genial este viernes por la tarde. ¿Tienes disponibilidad?',
      type: 'text',
      createdAt: new Date(Date.now() - 3000000),
    },
    {
      id: '3',
      matchId: '1',
      senderId: '2',
      content: 'Perfecto! El viernes a las 3pm te parece bien? Podemos hacerlo por videollamada.',
      type: 'text',
      createdAt: new Date(Date.now() - 1800000),
    },
  ];

  const selectedMessages = messages.filter(m => m.matchId === selectedMatch);
  const selectedMatchData = matches.find(m => m.id === selectedMatch);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Conversaciones</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {matches.map((match) => {
            const lastMessage = messages.filter(m => m.matchId === match.id).slice(-1)[0];
            const isSelected = selectedMatch === match.id;
            
            return (
              <button
                key={match.id}
                onClick={() => setSelectedMatch(match.id)}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                  isSelected ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-gray-600">
                      {match.user2.firstName[0]}{match.user2.lastName[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {match.user2.firstName} {match.user2.lastName}
                      </h4>
                      <span className="text-xs text-gray-500">2h</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{match.subject}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {lastMessage?.content || 'Nueva conexión'}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedMatchData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {selectedMatchData.user2.firstName[0]}{selectedMatchData.user2.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedMatchData.user2.firstName} {selectedMatchData.user2.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{selectedMatchData.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selectedMessages.map((message) => {
                const isOwn = message.senderId === '1';
                return (
                  <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      isOwn
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona una conversación</h3>
              <p className="text-gray-600">Elige una conversación para empezar a chatear</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};