import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';

interface Message {
  id: number;
  senderId: string;
  text: string;
  timestamp: string;
  isSent: boolean;
}

interface Chat {
  id: number;
  contactName: string;
  contactRole: string;
  contactAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
}

export function StudentMessagesView() {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const chats: Chat[] = [
    {
      id: 1,
      contactName: 'Mtro. Javier López',
      contactRole: 'Tutor',
      contactAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      lastMessage: 'Si tienes f(g(x)), la derivada es f\'(g(x)) * g\'(x)',
      timestamp: '10:21 AM',
      unreadCount: 1,
      online: true
    },
    {
      id: 2,
      contactName: 'Coordinadora María González',
      contactRole: 'Coordinadora',
      contactAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      lastMessage: 'Tu reporte mensual ha sido aprobado',
      timestamp: '9:30 AM',
      unreadCount: 0,
      online: false
    },
    {
      id: 3,
      contactName: 'Mtra. Elena Torres',
      contactRole: 'Tutora de Química',
      contactAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
      lastMessage: 'Nos vemos el viernes para química orgánica',
      timestamp: 'Ayer',
      unreadCount: 0,
      online: true
    },
    {
      id: 4,
      contactName: 'Soporte Técnico',
      contactRole: 'Administración',
      contactAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      lastMessage: 'Tu solicitud ha sido procesada',
      timestamp: '18 may',
      unreadCount: 0,
      online: false
    }
  ];

  const messages: { [key: number]: Message[] } = {
    1: [
      {
        id: 1,
        senderId: 'student',
        text: 'Hola maestro, tengo una duda sobre el tema de derivadas',
        timestamp: '10:15 AM',
        isSent: true
      },
      {
        id: 2,
        senderId: 'tutor',
        text: 'Hola Ana Laura, claro que sí. ¿Cuál es tu duda?',
        timestamp: '10:17 AM',
        isSent: false
      },
      {
        id: 3,
        senderId: 'student',
        text: 'No entiendo muy bien cómo aplicar la regla de la cadena en este ejercicio',
        timestamp: '10:18 AM',
        isSent: true
      },
      {
        id: 4,
        senderId: 'tutor',
        text: 'Perfecto. La regla de la cadena se usa cuando tienes una función compuesta. Déjame explicarte con un ejemplo.',
        timestamp: '10:20 AM',
        isSent: false
      },
      {
        id: 5,
        senderId: 'tutor',
        text: 'Si tienes f(g(x)), la derivada es f\'(g(x)) * g\'(x). ¿Tiene sentido?',
        timestamp: '10:21 AM',
        isSent: false
      }
    ],
    2: [
      {
        id: 1,
        senderId: 'coordinator',
        text: 'Hola Ana Laura, espero que estés bien',
        timestamp: '9:25 AM',
        isSent: false
      },
      {
        id: 2,
        senderId: 'coordinator',
        text: 'Tu reporte mensual ha sido aprobado',
        timestamp: '9:30 AM',
        isSent: false
      }
    ],
    3: [
      {
        id: 1,
        senderId: 'student',
        text: 'Buenas tardes maestra, ¿confirmamos la sesión del viernes?',
        timestamp: 'Ayer 3:20 PM',
        isSent: true
      },
      {
        id: 2,
        senderId: 'tutor',
        text: 'Sí, confirmado. Nos vemos el viernes para química orgánica',
        timestamp: 'Ayer 3:45 PM',
        isSent: false
      }
    ]
  };

  const currentChat = chats.find(chat => chat.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  const filteredChats = chats.filter(chat =>
    chat.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.contactRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] bg-white rounded-lg shadow-sm overflow-hidden flex">
      {/* Left Panel - Chats List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold mb-3">Mensajes</h3>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar conversación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                selectedChat === chat.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={chat.contactAvatar}
                  alt={chat.contactName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="font-semibold text-sm truncate">{chat.contactName}</p>
                    <p className="text-xs text-gray-500">{chat.contactRole}</p>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>

              {chat.unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat */}
      {currentChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={currentChat.contactAvatar}
                  alt={currentChat.contactName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {currentChat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{currentChat.contactName}</h3>
                <p className="text-xs text-gray-500">
                  {currentChat.contactRole} • {currentChat.online ? 'En línea' : 'Desconectado'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {currentMessages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.isSent
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isSent ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-700 mb-2">Selecciona una conversación</h3>
            <p className="text-gray-500 text-sm">
              Elige un contacto para comenzar a chatear
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
