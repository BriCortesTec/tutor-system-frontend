import { Users, CheckCircle, FileText, Calendar, AlertCircle, Clock } from 'lucide-react';

interface Props {
  onSectionChange: (section: string) => void;
}

export function TutorView({ onSectionChange }: Props) {
  const students = [
    { name: 'Ana Laura Gómez',    career: 'Ingeniería en Software', status: 'Bajo',  statusColor: 'bg-red-100 text-red-700' },
    { name: 'Carlos Méndez Ruiz', career: 'Ingeniería Industrial',  status: 'Medio', statusColor: 'bg-yellow-100 text-yellow-700' },
    { name: 'María Fernández',    career: 'Arquitectura',           status: 'Medio', statusColor: 'bg-yellow-100 text-yellow-700' },
    { name: 'Roberto Silva',      career: 'Diseño Gráfico',         status: 'Alto',  statusColor: 'bg-green-100 text-green-700' }
  ];

  const upcomingSessions = [
    { student: 'Ana Laura Gómez', topic: 'Cálculo diferencial', date: '20 mayo, 2026', time: '10:00 AM', status: 'Confirmada' },
    { student: 'Carlos Méndez',   topic: 'Álgebra lineal',      date: '21 mayo, 2026', time: '2:00 PM',  status: 'Confirmada' },
    { student: 'María Fernández', topic: 'Física I',            date: '22 mayo, 2026', time: '11:00 AM', status: 'Pendiente' }
  ];

  const completedSessions = [
    { student: 'Ana Laura Gómez', topic: 'Cálculo integral', status: 'Completada' },
    { student: 'Roberto Silva',   topic: 'Estadística',      status: 'Completada' },
    { student: 'Carlos Méndez',   topic: 'Programación',     status: 'Completada' }
  ];

  const alerts = [
    { icon: AlertCircle, text: 'Ana Laura requiere seguimiento urgente en matemáticas', color: 'text-red-600 bg-red-50' },
    { icon: Clock,       text: 'Recordatorio: tienes 3 reportes pendientes por entregar', color: 'text-orange-600 bg-orange-50' }
  ];

  const quickActions = [
    { label: 'Mis estudiantes', icon: '👨‍🎓', color: 'bg-blue-50 text-blue-600',   section: 'mis-estudiantes' },
    { label: 'Mensajes',        icon: '💬', color: 'bg-green-50 text-green-600',  section: 'mensajes' },
    { label: 'Ver calendario',  icon: '📅', color: 'bg-purple-50 text-purple-600', section: 'horarios' },
    { label: 'Sesiones',        icon: '📋', color: 'bg-orange-50 text-orange-600', section: 'sesiones-realizadas' },
    { label: 'Generar reporte', icon: '📊', color: 'bg-pink-50 text-pink-600',    section: 'reportes' },
    { label: 'Avisos',          icon: '🔔', color: 'bg-yellow-50 text-yellow-600', section: 'avisos' }
  ];

  const calendarEvents = [
    { day: 20, label: 'Tutoría', time: '10:00 AM', color: 'bg-blue-100',   section: 'horarios' },
    { day: 21, label: 'Tutoría', time: '2:00 PM',  color: 'bg-green-100',  section: 'horarios' },
    { day: 22, label: 'Reporte', time: '',          color: 'bg-orange-100', section: 'reportes' }
  ];

  // Stats redirigen a su sección
  const stats = [
    { label: 'Mis estudiantes',      value: '16', icon: Users,         bg: 'bg-blue-50',   color: 'text-blue-600',   section: 'mis-estudiantes' },
    { label: 'Tutorías realizadas',  value: '28', icon: CheckCircle,   bg: 'bg-green-50',  color: 'text-green-600',  section: 'sesiones-realizadas' },
    { label: 'Reportes pendientes',  value: '22', icon: FileText,      bg: 'bg-orange-50', color: 'text-orange-600', section: 'reportes' },
    { label: 'Sesiones programadas', value: '5',  icon: Calendar,      bg: 'bg-purple-50', color: 'text-purple-600', section: 'horarios' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards — clickeables */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, bg, color, section }) => (
          <button
            key={section}
            onClick={() => onSectionChange(section)}
            className="bg-white rounded-lg p-6 shadow-sm text-left hover:shadow-md transition-shadow w-full"
          >
            <div className="flex items-center gap-3">
              <div className={`${bg} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="font-semibold">{value}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Mis estudiantes */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Mis estudiantes</h3>
              <button
                onClick={() => onSectionChange('mis-estudiantes')}
                className="text-blue-600 text-sm hover:underline"
              >
                Ver todos
              </button>
            </div>
            <div className="space-y-3">
              {students.map((student, i) => (
                <button
                  key={i}
                  onClick={() => onSectionChange('mis-estudiantes')}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
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
                </button>
              ))}
            </div>
            <button
              onClick={() => onSectionChange('mis-estudiantes')}
              className="text-blue-600 text-sm hover:underline mt-4"
            >
              Ver lista completa de estudiantes →
            </button>
          </div>

          {/* Próximas tutorías */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Próximas tutorías</h3>
              <button
                onClick={() => onSectionChange('horarios')}
                className="text-blue-600 text-sm hover:underline"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-3">
              {upcomingSessions.map((session, i) => (
                <button
                  key={i}
                  onClick={() => onSectionChange('horarios')}
                  className="border border-gray-200 rounded-lg p-4 w-full text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{session.student}</p>
                      <p className="text-sm text-gray-600 mb-2">{session.topic}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {session.time}
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
                </button>
              ))}
            </div>
          </div>

          {/* Sesiones realizadas */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Sesiones realizadas</h3>
              <button
                onClick={() => onSectionChange('sesiones-realizadas')}
                className="text-blue-600 text-sm hover:underline"
              >
                Ver historial
              </button>
            </div>
            <div className="space-y-3">
              {completedSessions.map((session, i) => (
                <button
                  key={i}
                  onClick={() => onSectionChange('sesiones-realizadas')}
                  className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50 rounded w-full text-left hover:bg-green-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm">{session.student}</p>
                    <p className="text-xs text-gray-600">{session.topic}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {session.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Resumen sesiones */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Resumen de sesiones</h3>
              <button
                onClick={() => onSectionChange('sesiones-realizadas')}
                className="text-blue-600 text-sm hover:underline"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-2">
              {[['Esta semana', '8'], ['Este mes', '28'], ['Total', '156']].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Alertas recientes</h3>
              <button
                onClick={() => onSectionChange('avisos')}
                className="text-blue-600 text-sm hover:underline"
              >
                Ver avisos
              </button>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, i) => {
                const Icon = alert.icon;
                return (
                  <button
                    key={i}
                    onClick={() => onSectionChange('avisos')}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 w-full text-left"
                  >
                    <div className={`${alert.color} p-2 rounded-lg flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-gray-700">{alert.text}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Acciones rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.section}
                  onClick={() => onSectionChange(action.section)}
                  className={`${action.color} p-4 rounded-lg hover:opacity-80 transition-opacity text-center`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <p className="text-xs font-medium">{action.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Mini calendario */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Próximos eventos</h3>
              <button
                onClick={() => onSectionChange('horarios')}
                className="text-blue-600 text-sm hover:underline"
              >
                Ver calendario
              </button>
            </div>
            <div className="space-y-2">
              {calendarEvents.map((event, i) => (
                <button
                  key={i}
                  onClick={() => onSectionChange(event.section)}
                  className={`${event.color} p-3 rounded-lg w-full text-left hover:opacity-80 transition-opacity`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Día {event.day} de mayo</p>
                      <p className="text-xs text-gray-600">{event.label}</p>
                    </div>
                    {event.time && <p className="text-xs text-gray-600">{event.time}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
