import React, { useState, useEffect } from 'react';
import { Search, Video, Phone, MoreVertical, Send, MessageCircle } from 'lucide-react';
import { Message, Match } from '../../types';

const STORAGE_KEY_MESSAGES = 'ensenapge_messages';
const STORAGE_KEY_MATCHES = 'ensenapge_matches';

export const MessagesPage: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial data
  const initialMatches: Match[] = [
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

  const initialMessages: Message[] = [
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

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedMessages = localStorage.getItem(STORAGE_KEY_MESSAGES);
        const storedMatches = localStorage.getItem(STORAGE_KEY_MATCHES);

        if (storedMessages) {
          const parsedMessages = JSON.parse(storedMessages);
          // Convert date strings back to Date objects
          const messagesWithDates = parsedMessages.map((msg: any) => ({
            ...msg,
            createdAt: new Date(msg.createdAt)
          }));
          setMessages(messagesWithDates);
        } else {
          // Initialize with default messages
          setMessages(initialMessages);
          localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(initialMessages));
        }

        if (storedMatches) {
          const parsedMatches = JSON.parse(storedMatches);
          // Convert date strings back to Date objects
          const matchesWithDates = parsedMatches.map((match: any) => ({
            ...match,
            createdAt: new Date(match.createdAt)
          }));
          setMatches(matchesWithDates);
        } else {
          // Initialize with default matches
          setMatches(initialMatches);
          localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(initialMatches));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        setMessages(initialMessages);
        setMatches(initialMatches);
      }
    };

    loadData();
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages to localStorage:', error);
      }
    }
  }, [messages]);

  // Filter matches based on search query
  const filteredMatches = matches.filter(match => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const fullName = `${match.user2.firstName} ${match.user2.lastName}`.toLowerCase();
    const subject = match.subject.toLowerCase();
    return fullName.includes(query) || subject.includes(query);
  });

  const selectedMessages = messages.filter(m => m.matchId === selectedMatch);
  const selectedMatchData = matches.find(m => m.id === selectedMatch);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMatch) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      matchId: selectedMatch,
      senderId: '1', // Current user ID
      content: newMessage.trim(),
      type: 'text',
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  // Get the time difference for display
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  // Get last message for each match
  const getLastMessage = (matchId: string) => {
    const matchMessages = messages.filter(m => m.matchId === matchId);
    return matchMessages.length > 0 ? matchMessages[matchMessages.length - 1] : null;
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar conversaciones..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => {
              const lastMessage = getLastMessage(match.id);
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
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-white">
                        {match.user2.firstName[0]}{match.user2.lastName[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {match.user2.firstName} {match.user2.lastName}
                        </h4>
                        {lastMessage && (
                          <span className="text-xs text-gray-500">
                            {getTimeAgo(lastMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{match.subject}</p>
                      <p className="text-sm text-gray-600 truncate">
                        {lastMessage?.content || 'Nueva conexión'}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No se encontraron conversaciones</p>
            </div>
          )}
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
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
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
              {selectedMessages.length > 0 ? (
                selectedMessages.map((message) => {
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
                })
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No hay mensajes aún</p>
                    <p className="text-sm">Envía el primer mensaje para comenzar</p>
                  </div>
                </div>
              )}
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