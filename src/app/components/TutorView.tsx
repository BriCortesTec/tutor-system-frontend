import { Users, CheckCircle, FileText, Calendar, AlertCircle, Clock, ChevronRight } from 'lucide-react';

export function TutorView() {
  const students = [
    { name: 'Ana Laura Gómez', career: 'Ingeniería en Software', status: 'Bajo', statusColor: 'bg-red-100 text-red-700' },
    { name: 'Carlos Méndez Ruiz', career: 'Ingeniería Industrial', status: 'Medio', statusColor: 'bg-yellow-100 text-yellow-700' },
    { name: 'María Fernández', career: 'Arquitectura', status: 'Medio', statusColor: 'bg-yellow-100 text-yellow-700' },
    { name: 'Roberto Silva', career: 'Diseño Gráfico', status: 'Alto', statusColor: 'bg-green-100 text-green-700' }
  ];

  const upcomingSessions = [
    { student: 'Ana Laura Gómez', topic: 'Cálculo diferencial', date: '20 mayo, 2026', time: '10:00 AM', status: 'Confirmada' },
    { student: 'Carlos Méndez', topic: 'Álgebra lineal', date: '21 mayo, 2026', time: '2:00 PM', status: 'Confirmada' },
    { student: 'María Fernández', topic: 'Física I', date: '22 mayo, 2026', time: '11:00 AM', status: 'Pendiente' }
  ];

  const completedSessions = [
    { student: 'Ana Laura Gómez', topic: 'Cálculo integral', status: 'Completada' },
    { student: 'Roberto Silva', topic: 'Estadística', status: 'Completada' },
    { student: 'Carlos Méndez', topic: 'Programación', status: 'Completada' }
  ];

  const alerts = [
    { icon: AlertCircle, text: 'Ana Laura requiere seguimiento urgente en matemáticas', color: 'text-red-600 bg-red-50' },
    { icon: Clock, text: 'Recordatorio: tienes 3 reportes pendientes por entregar', color: 'text-orange-600 bg-orange-50' }
  ];

  const quickActions = [
    { label: 'Registrar tutoría', icon: '📝', color: 'bg-blue-50 text-blue-600' },
    { label: 'Enviar mensaje', icon: '💬', color: 'bg-green-50 text-green-600' },
    { label: 'Ver calendario', icon: '📅', color: 'bg-purple-50 text-purple-600' },
    { label: 'Subir material', icon: '📎', color: 'bg-orange-50 text-orange-600' },
    { label: 'Generar reporte', icon: '📊', color: 'bg-pink-50 text-pink-600' },
    { label: 'Evaluar estudiante', icon: '⭐', color: 'bg-yellow-50 text-yellow-600' }
  ];

  const calendarEvents = [
    { day: 20, label: 'Tutoría', time: '10:00 AM', color: 'bg-blue-100' },
    { day: 21, label: 'Tutoría', time: '2:00 PM', color: 'bg-green-100' },
    { day: 22, label: 'Reporte', time: '', color: 'bg-orange-100' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Mis estudiantes</p>
              <p className="font-semibold">16</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tutorías realizadas</p>
              <p className="font-semibold">28</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reportes pendientes</p>
              <p className="font-semibold">22</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sesiones programadas</p>
              <p className="font-semibold">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Students and Sessions */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Students */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Mis estudiantes</h3>
              <button className="text-blue-600 text-sm hover:underline">Ver todos</button>
            </div>
            <div className="space-y-3">
              {students.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.career}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${student.statusColor}`}>
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="text-blue-600 text-sm hover:underline mt-4">
              Ver lista de estudiantes →
            </button>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Próximas tutorías</h3>
              <button className="text-blue-600 text-sm hover:underline">Ver todas</button>
            </div>
            <div className="space-y-3">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{session.student}</p>
                      <p className="text-sm text-gray-600 mb-2">{session.topic}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.time}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      session.status === 'Confirmada'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Sessions */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Sesiones realizadas</h3>
              <button className="text-blue-600 text-sm hover:underline">Ver historial</button>
            </div>
            <div className="space-y-3">
              {completedSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50 rounded">
                  <div>
                    <p className="font-medium text-sm">{session.student}</p>
                    <p className="text-xs text-gray-600">{session.topic}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Alerts, Actions, Calendar */}
        <div className="space-y-6">
          {/* Sesiones realizadas - smaller list */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Sesiones realizadas</h3>
              <button className="text-blue-600 text-sm hover:underline">Ver todas</button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Esta semana</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Este mes</span>
                <span className="font-medium">28</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total</span>
                <span className="font-medium">156</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Alertas recientes</h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => {
                const Icon = alert.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`${alert.color} p-2 rounded-lg`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-gray-700 flex-1">{alert.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Acciones rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`${action.color} p-4 rounded-lg hover:opacity-80 transition-opacity text-center`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <p className="text-xs font-medium">{action.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Mini Calendar */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Mayo 2026</h3>
            <div className="space-y-2">
              {calendarEvents.map((event, index) => (
                <div key={index} className={`${event.color} p-3 rounded-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Día {event.day}</p>
                      <p className="text-xs text-gray-600">{event.label}</p>
                    </div>
                    {event.time && (
                      <p className="text-xs text-gray-600">{event.time}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="text-blue-600 text-sm hover:underline mt-4 w-full text-center">
              Ver calendario completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
