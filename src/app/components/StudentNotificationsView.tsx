import { Bell, CheckCircle, AlertCircle, Info, AlertTriangle, Calendar, FileText, MessageSquare } from 'lucide-react';

export function StudentNotificationsView() {
  const notifications = [
    {
      id: 1,
      type: 'info',
      icon: Info,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      title: 'Se agregó un nuevo tutorado en el sistema',
      description: 'Has sido asignado a Mtro. Javier López para tutorías de matemáticas',
      category: 'Sistema',
      date: '22/05/2026',
      time: '10:30 AM',
      priority: 'Normal',
      read: false
    },
    {
      id: 2,
      type: 'success',
      icon: CheckCircle,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      title: 'Tutoría confirmada',
      description: 'Tu sesión de física del 23 de mayo ha sido confirmada',
      category: 'Tutorías',
      date: '22/05/2026',
      time: '09:15 AM',
      priority: 'Normal',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertTriangle,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      title: 'Recordatorio: Entrega de laboratorio 3',
      description: 'La fecha límite es el 24 de mayo a las 11:59 PM',
      category: 'Entregas',
      date: '21/05/2026',
      time: '04:45 PM',
      priority: 'Alta',
      read: true
    },
    {
      id: 4,
      type: 'info',
      icon: MessageSquare,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      title: 'Nuevo mensaje de tu tutor',
      description: 'Mtro. Javier López te ha enviado material de estudio',
      category: 'Mensajes',
      date: '21/05/2026',
      time: '02:30 PM',
      priority: 'Normal',
      read: true
    },
    {
      id: 5,
      type: 'alert',
      icon: AlertCircle,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      title: 'Atención: Promedio bajo en matemáticas',
      description: 'Se recomienda asistir a sesiones adicionales de tutoría',
      category: 'Académico',
      date: '20/05/2026',
      time: '11:00 AM',
      priority: 'Alta',
      read: true
    },
    {
      id: 6,
      type: 'info',
      icon: Calendar,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      title: 'Cambio de horario',
      description: 'La tutoría del viernes se movió a las 3:00 PM',
      category: 'Tutorías',
      date: '19/05/2026',
      time: '05:00 PM',
      priority: 'Media',
      read: true
    },
    {
      id: 7,
      type: 'success',
      icon: FileText,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      title: 'Reporte de progreso disponible',
      description: 'Tu tutor ha publicado el reporte mensual',
      category: 'Reportes',
      date: '18/05/2026',
      time: '10:00 AM',
      priority: 'Normal',
      read: true
    }
  ];

  const categories = [
    { name: 'Sistema', count: 5, icon: Info },
    { name: 'Tutorías', count: 12, icon: Calendar },
    { name: 'Entregas', count: 3, icon: FileText },
    { name: 'Mensajes', count: 8, icon: MessageSquare },
    { name: 'Académico', count: 2, icon: AlertCircle }
  ];

  const quickActions = [
    { label: 'Nueva tutoría', description: 'Programar sesión' },
    { label: 'Ver calendario', description: 'Eventos del mes' },
    { label: 'Enviar mensaje', description: 'Contactar tutor' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-100 text-red-700';
      case 'Media':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-semibold mb-1">Avisos</h2>
        <p className="text-sm text-gray-600">Mantente informado sobre tus actividades académicas</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold">Lista de avisos</h3>
          </div>

          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`${notification.iconBg} p-3 rounded-lg h-fit`}>
                      <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{notification.title}</h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                            {notification.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{notification.date}</span>
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
