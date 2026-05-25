import { Calendar, CheckCircle, Clock, Users, TrendingUp, FileText, Video } from 'lucide-react';

export function StudentTutoriasView() {
  const scheduledSessions = [
    {
      subject: 'Tutoría de matemáticas',
      date: '22 mayo, 2026',
      time: '10:00 AM',
      tutor: 'Mtro. Javier López',
      status: 'Confirmada',
      type: 'Presencial'
    },
    {
      subject: 'Tutoría de física',
      date: '23 mayo, 2026',
      time: '2:00 PM',
      tutor: 'Mtra. Elena Torres',
      status: 'Confirmada',
      type: 'Virtual'
    },
    {
      subject: 'Tutoría de programación',
      date: '25 mayo, 2026',
      time: '4:00 PM',
      tutor: 'Mtro. Carlos Ramírez',
      status: 'Pendiente',
      type: 'Presencial'
    }
  ];

  const recentActivities = [
    {
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
      title: 'Tutoría completada',
      description: 'Sesión de cálculo diferencial con Mtro. Javier López',
      date: '18 mayo, 2026'
    },
    {
      icon: FileText,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      title: 'Material compartido',
      description: 'Ejercicios de práctica - Álgebra lineal',
      date: '17 mayo, 2026'
    },
    {
      icon: Calendar,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      title: 'Nueva sesión programada',
      description: 'Tutoría de química orgánica',
      date: '16 mayo, 2026'
    }
  ];

  const tutorshipStatus = [
    { tutor: 'Mtro. Javier López', subject: 'Matemáticas', sessions: 8, lastSession: '18 mayo', status: 'Activa' },
    { tutor: 'Mtra. Elena Torres', subject: 'Física', sessions: 6, lastSession: '15 mayo', status: 'Activa' },
    { tutor: 'Mtro. Carlos Ramírez', subject: 'Programación', sessions: 10, lastSession: '20 mayo', status: 'Activa' }
  ];

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const firstDayOfWeek = 4;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-semibold mb-1">Mis tutorías</h2>
        <p className="text-sm text-gray-600">Gestiona y da seguimiento a tus sesiones de tutoría</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scheduled Sessions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Sesiones programadas</h3>
              <button className="text-blue-600 text-sm hover:underline">Ver todas</button>
            </div>
            <div className="space-y-3">
              {scheduledSessions.map((session, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{session.subject}</h4>
                      <p className="text-sm text-gray-600">{session.tutor}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      session.status === 'Confirmada'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {session.type === 'Virtual' ? (
                        <Video className="w-3 h-3" />
                      ) : (
                        <Users className="w-3 h-3" />
                      )}
                      <span>{session.type}</span>
                    </div>
                  </div>
                  <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Ver detalles →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tutorship Status */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-semibold">Estado de mis tutorías</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Tutor</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Materia</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Sesiones</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Última sesión</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {tutorshipStatus.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-6 text-sm font-medium">{item.tutor}</td>
                      <td className="py-3 px-6 text-sm text-gray-700">{item.subject}</td>
                      <td className="py-3 px-6 text-sm font-medium">{item.sessions}</td>
                      <td className="py-3 px-6 text-sm text-gray-600">{item.lastSession}</td>
                      <td className="py-3 px-6">
                        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Mayo 2026</h3>
            <div className="grid grid-cols-7 gap-1">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-600 pb-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`}></div>
              ))}
              {daysInMonth.map(day => {
                const hasEvent = [15, 18, 22, 23, 25].includes(day);
                const isToday = day === 18;
                return (
                  <div
                    key={day}
                    className={`aspect-square flex items-center justify-center text-xs rounded ${
                      isToday
                        ? 'bg-blue-600 text-white font-semibold'
                        : hasEvent
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Actividades recientes</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex gap-3">
                    <div className={`${activity.iconBg} p-2 rounded-lg h-fit`}>
                      <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">{activity.title}</p>
                      <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
