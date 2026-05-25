import { Bell, CheckCircle, AlertCircle, Calendar, Users, FileText, MessageSquare, Clock, Info } from 'lucide-react';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'alert';
  title: string;
  message: string;
  date: string;
  time: string;
  isImportant: boolean;
  read: boolean;
}

export function TutorNotificationsView() {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'alert',
      title: 'Estudiante en riesgo',
      message: 'Ana Laura Gómez requiere seguimiento urgente. Su promedio ha bajado a 7.2',
      date: '22 mayo 2026',
      time: '10:30 AM',
      isImportant: true,
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Nueva tutoría asignada',
      message: 'Se ha programado una nueva sesión con Carlos Méndez para el 25 de mayo a las 2:00 PM',
      date: '22 mayo 2026',
      time: '09:15 AM',
      isImportant: false,
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Reporte pendiente',
      message: 'Tienes 3 reportes de tutoría pendientes de entregar antes del 24 de mayo',
      date: '21 mayo 2026',
      time: '04:45 PM',
      isImportant: true,
      read: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Sesión completada',
      message: 'La tutoría con Roberto Silva García se ha marcado como completada exitosamente',
      date: '21 mayo 2026',
      time: '03:20 PM',
      isImportant: false,
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'Mensaje nuevo',
      message: 'María Fernández López te ha enviado un mensaje sobre la próxima sesión',
      date: '21 mayo 2026',
      time: '11:00 AM',
      isImportant: false,
      read: true
    },
    {
      id: 6,
      type: 'warning',
      title: 'Cambio de horario',
      message: 'La sesión del viernes 23 de mayo ha sido reprogramada para el lunes 26 de mayo',
      date: '20 mayo 2026',
      time: '02:30 PM',
      isImportant: true,
      read: true
    },
    {
      id: 7,
      type: 'success',
      title: 'Reporte aprobado',
      message: 'Tu reporte mensual ha sido aprobado por el coordinador académico',
      date: '20 mayo 2026',
      time: '10:00 AM',
      isImportant: false,
      read: true
    },
    {
      id: 8,
      type: 'info',
      title: 'Recordatorio de sesión',
      message: 'Tienes una tutoría programada mañana a las 10:00 AM con Laura Hernández',
      date: '19 mayo 2026',
      time: '05:00 PM',
      isImportant: false,
      read: true
    },
    {
      id: 9,
      type: 'alert',
      title: 'Sesión cancelada',
      message: 'Pedro Sánchez Ruiz ha cancelado la sesión del 20 de mayo',
      date: '19 mayo 2026',
      time: '01:15 PM',
      isImportant: true,
      read: true
    },
    {
      id: 10,
      type: 'info',
      title: 'Actualización de materiales',
      message: 'Nuevos materiales de estudio disponibles en la biblioteca digital',
      date: '18 mayo 2026',
      time: '09:00 AM',
      isImportant: false,
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return Clock;
      case 'alert':
        return AlertCircle;
      case 'info':
        return Info;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-green-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-500 text-yellow-700';
      case 'alert':
        return 'bg-red-50 border-red-500 text-red-700';
      case 'info':
        return 'bg-blue-50 border-blue-500 text-blue-700';
      default:
        return 'bg-gray-50 border-gray-500 text-gray-700';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'alert':
        return 'text-red-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const importantCount = notifications.filter(n => n.isImportant && !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Centro de notificaciones</h2>
          <p className="text-sm text-gray-600">Mantente al día con tus actividades</p>
        </div>
        <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
          Marcar todas como leídas
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de avisos</p>
              <p className="font-semibold">{notifications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">No leídos</p>
              <p className="font-semibold">{unreadCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Importantes</p>
              <p className="font-semibold">{importantCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold">Avisos recientes</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const colorClass = getNotificationColor(notification.type);
            const iconColorClass = getIconColor(notification.type);

            return (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className={`${colorClass} p-3 rounded-lg h-fit border-l-4`}>
                    <Icon className={`w-5 h-5 ${iconColorClass}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {notification.isImportant && (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            Importante
                          </span>
                        )}
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{notification.date}</p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{notification.message}</p>

                    <div className="flex gap-2">
                      {!notification.read && (
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                          Marcar como leída
                        </button>
                      )}
                      <button className="text-xs text-gray-600 hover:text-gray-700">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State (commented for reference) */}
      {/* {notifications.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold mb-2">No tienes notificaciones</h3>
          <p className="text-gray-600">Cuando recibas avisos, aparecerán aquí</p>
        </div>
      )} */}
    </div>
  );
}
