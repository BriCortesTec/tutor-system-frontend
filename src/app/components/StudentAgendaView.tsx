import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, User, Plus, Filter } from 'lucide-react';
import { useState } from 'react';

export function StudentAgendaView() {
  const [currentMonth, setCurrentMonth] = useState('Mayo 2026');

  const calendarEvents = [
    { day: 15, title: 'Tutoría - Matemáticas', time: '10:00 AM', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { day: 16, title: 'Entrega proyecto', time: '11:59 PM', color: 'bg-orange-100 text-orange-700 border-orange-300' },
    { day: 18, title: 'Tutoría - Física', time: '2:00 PM', color: 'bg-green-100 text-green-700 border-green-300' },
    { day: 20, title: 'Examen Química', time: '9:00 AM', color: 'bg-red-100 text-red-700 border-red-300' },
    { day: 22, title: 'Tutoría - Programación', time: '4:00 PM', color: 'bg-purple-100 text-purple-700 border-purple-300' },
    { day: 25, title: 'Reunión tutor', time: '11:00 AM', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' }
  ];

  const upcomingSessions = [
    {
      subject: 'Tutoría de matemáticas',
      date: '15 mayo, 2026',
      time: '10:00 AM',
      tutor: 'Mtro. Javier López',
      location: 'Aula 301',
      status: 'Confirmada',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      subject: 'Tutoría de física',
      date: '18 mayo, 2026',
      time: '2:00 PM',
      tutor: 'Mtra. Elena Torres',
      location: 'Virtual',
      status: 'Confirmada',
      color: 'bg-green-50 border-green-200'
    },
    {
      subject: 'Tutoría de programación',
      date: '22 mayo, 2026',
      time: '4:00 PM',
      tutor: 'Mtro. Carlos Ramírez',
      location: 'Lab. Cómputo',
      status: 'Pendiente',
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const monthEvents = [
    { date: '15/05', event: 'Tutoría matemáticas', time: '10:00 AM', type: 'Tutoría', status: 'Confirmada' },
    { date: '16/05', event: 'Entrega de proyecto', time: '11:59 PM', type: 'Entrega', status: 'Pendiente' },
    { date: '18/05', event: 'Tutoría física', time: '2:00 PM', type: 'Tutoría', status: 'Confirmada' },
    { date: '20/05', event: 'Examen química', time: '9:00 AM', type: 'Examen', status: 'Programado' },
    { date: '22/05', event: 'Tutoría programación', time: '4:00 PM', type: 'Tutoría', status: 'Pendiente' }
  ];

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const firstDayOfWeek = 4; // Thursday (0 = Sunday)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Mi agenda</h2>
          <p className="text-sm text-gray-600">Visualiza y administra tus actividades programadas</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Agregar evento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">{currentMonth}</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Hoy
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Days of week */}
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 pb-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}

            {/* Days of month */}
            {daysInMonth.map(day => {
              const event = calendarEvents.find(e => e.day === day);
              const isToday = day === 18;

              return (
                <div
                  key={day}
                  className={`aspect-square border rounded-lg p-2 hover:bg-gray-50 cursor-pointer ${
                    isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
                    {day}
                  </div>
                  {event && (
                    <div className={`text-xs p-1 rounded border ${event.color} truncate`}>
                      {event.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Próximas sesiones</h3>
              <button className="text-blue-600 text-sm hover:underline">Ver todas</button>
            </div>
            <div className="space-y-3">
              {upcomingSessions.map((session, index) => (
                <div key={index} className={`p-4 rounded-lg border ${session.color}`}>
                  <h4 className="font-medium text-sm mb-2">{session.subject}</h4>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{session.tutor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>{session.location}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
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
        </div>
      </div>

    </div>
  );
}
