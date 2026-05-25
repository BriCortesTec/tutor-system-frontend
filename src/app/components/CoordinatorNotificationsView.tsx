import { Bell, CheckCircle, AlertCircle, Info, AlertTriangle, Search, Filter, Plus, UserPlus, FileText, Mail, BarChart3 } from 'lucide-react';

export function CoordinatorNotificationsView() {
  const notifications = [
    {
      id: 1,
      type: 'info',
      icon: Info,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      title: 'Nuevo estudiante registrado en el sistema',
      description: 'Ana Laura Gómez (2021-0456) ha sido agregado al sistema',
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
      title: 'Reporte mensual completado',
      description: 'El reporte de tutorías del mes de mayo ha sido generado exitosamente',
      date: '22/05/2026',
      time: '09:15 AM',
      priority: 'Normal',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertTriangle,
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      title: 'Tutor con carga alta de estudiantes',
      description: 'Mtro. Javier López tiene asignados 25 estudiantes, considera redistribuir',
      date: '21/05/2026',
      time: '04:45 PM',
      priority: 'Media',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      icon: AlertCircle,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      title: 'Estudiante en riesgo académico alto',
      description: 'Pedro Sánchez Ruiz requiere atención inmediata - Promedio: 6.8',
      date: '21/05/2026',
      time: '02:30 PM',
      priority: 'Alta',
      read: true
    },
    {
      id: 5,
      type: 'info',
      icon: Info,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      title: 'Recordatorio de reunión académica',
      description: 'Junta de coordinación programada para el 25 de mayo a las 10:00 AM',
      date: '21/05/2026',
      time: '11:00 AM',
      priority: 'Normal',
      read: true
    },
    {
      id: 6,
      type: 'success',
      icon: CheckCircle,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      title: 'Asignación completada exitosamente',
      description: 'María Fernández López ha sido asignada a Mtro. Carlos Ramírez',
      date: '20/05/2026',
      time: '03:20 PM',
      priority: 'Normal',
      read: true
    },
    {
      id: 7,
      type: 'info',
      icon: Info,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      title: 'Actualización del sistema programada',
      description: 'Mantenimiento del sistema el 26 de mayo de 2:00 AM a 4:00 AM',
      date: '20/05/2026',
      time: '10:00 AM',
      priority: 'Normal',
      read: true
    },
    {
      id: 8,
      type: 'warning',
      icon: AlertTriangle,
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      title: '5 reportes de tutoría pendientes de revisión',
      description: 'Hay reportes sin revisar de la semana pasada',
      date: '19/05/2026',
      time: '05:00 PM',
      priority: 'Media',
      read: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-100 text-red-700';
      case 'Media':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Avisos</h2>
          <p className="text-sm text-gray-600">Centro de notificaciones del sistema</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Nuevo aviso
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total avisos</p>
              <p className="font-semibold">28</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Leídos</p>
              <p className="font-semibold">18</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">No leídos</p>
              <p className="font-semibold">{unreadCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Alertas importantes</p>
              <p className="font-semibold">104</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold">Lista de avisos</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar aviso..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filtros
              </button>
            </div>
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
                          <p className="text-sm text-gray-600">{notification.description}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ml-3 whitespace-nowrap ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{notification.date}</span>
                          <span>{notification.time}</span>
                        </div>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                              Marcar como leída
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-600">Mostrando 8 de 28 avisos</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                Anterior
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                Siguiente
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Acciones rápidas</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Crear aviso</p>
                  <p className="text-xs text-gray-600">Nueva notificación</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="bg-green-600 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Marcar todas como leídas</p>
                  <p className="text-xs text-gray-600">Limpiar pendientes</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Ver estadísticas</p>
                  <p className="text-xs text-gray-600">Análisis de avisos</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="bg-orange-600 p-2 rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Enviar notificación masiva</p>
                  <p className="text-xs text-gray-600">A todos los usuarios</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
