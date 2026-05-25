import { useState } from 'react';
import { Plus, Edit, Trash2, Clock, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeSlot {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'disponible' | 'ocupado';
  studentName?: string;
}

export function ScheduleView() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const [schedules, setSchedules] = useState<TimeSlot[]>([
    {
      id: 1,
      day: 'Lunes',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Aula 301',
      type: 'disponible'
    },
    {
      id: 2,
      day: 'Lunes',
      startTime: '14:00',
      endTime: '16:00',
      location: 'Virtual',
      type: 'ocupado',
      studentName: 'Ana Laura Gómez'
    },
    {
      id: 3,
      day: 'Martes',
      startTime: '09:00',
      endTime: '11:00',
      location: 'Aula 205',
      type: 'disponible'
    },
    {
      id: 4,
      day: 'Miércoles',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Virtual',
      type: 'disponible'
    },
    {
      id: 5,
      day: 'Miércoles',
      startTime: '15:00',
      endTime: '17:00',
      location: 'Aula 301',
      type: 'ocupado',
      studentName: 'Carlos Méndez'
    },
    {
      id: 6,
      day: 'Jueves',
      startTime: '08:00',
      endTime: '10:00',
      location: 'Aula 205',
      type: 'disponible'
    },
    {
      id: 7,
      day: 'Jueves',
      startTime: '14:00',
      endTime: '16:00',
      location: 'Virtual',
      type: 'disponible'
    },
    {
      id: 8,
      day: 'Viernes',
      startTime: '11:00',
      endTime: '13:00',
      location: 'Aula 301',
      type: 'disponible'
    }
  ]);

  const handleAddSchedule = () => {
    if (!selectedDay || !startTime || !endTime || !location) {
      alert('Por favor completa todos los campos');
      return;
    }

    const newSlot: TimeSlot = {
      id: schedules.length + 1,
      day: selectedDay,
      startTime,
      endTime,
      location,
      type: 'disponible'
    };

    setSchedules([...schedules, newSlot]);
    resetForm();
    setShowAddModal(false);
  };

  const handleEditSchedule = () => {
    if (!editingSlot || !selectedDay || !startTime || !endTime || !location) {
      alert('Por favor completa todos los campos');
      return;
    }

    setSchedules(schedules.map(slot =>
      slot.id === editingSlot.id
        ? { ...slot, day: selectedDay, startTime, endTime, location }
        : slot
    ));

    resetForm();
    setEditingSlot(null);
  };

  const handleDeleteSchedule = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este horario?')) {
      setSchedules(schedules.filter(slot => slot.id !== id));
    }
  };

  const openEditModal = (slot: TimeSlot) => {
    setEditingSlot(slot);
    setSelectedDay(slot.day);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setLocation(slot.location);
  };

  const resetForm = () => {
    setSelectedDay('');
    setStartTime('');
    setEndTime('');
    setLocation('');
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingSlot(null);
    resetForm();
  };

  const getSchedulesForDay = (day: string) => {
    return schedules.filter(slot => slot.day === day).sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );
  };

  const getTimeSlotPosition = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    return (hour - 7) * 60; // 60px per hour, starting from 7am
  };

  const getSlotHeight = (startTime: string, endTime: string) => {
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    return (end - start) * 60; // 60px per hour
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Mis horarios</h2>
          <p className="text-sm text-gray-600">Gestiona tu disponibilidad para tutorías</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Agregar disponibilidad
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Horarios disponibles</p>
              <p className="font-semibold">
                {schedules.filter(s => s.type === 'disponible').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Horarios ocupados</p>
              <p className="font-semibold">
                {schedules.filter(s => s.type === 'ocupado').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total horas/semana</p>
              <p className="font-semibold">
                {schedules.reduce((acc, slot) => {
                  const start = parseInt(slot.startTime.split(':')[0]);
                  const end = parseInt(slot.endTime.split(':')[0]);
                  return acc + (end - start);
                }, 0)}h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Días activos</p>
              <p className="font-semibold">
                {new Set(schedules.map(s => s.day)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h3 className="font-semibold">Semana del 19 - 23 Mayo 2026</h3>
            <p className="text-sm text-gray-600">Horarios de tutoría</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Days Header */}
            <div className="grid grid-cols-6 border-b border-gray-200">
              <div className="p-4 bg-gray-50 border-r border-gray-200">
                <span className="text-sm font-medium text-gray-600">Hora</span>
              </div>
              {days.map(day => (
                <div key={day} className="p-4 bg-gray-50 border-r border-gray-200 last:border-r-0">
                  <div className="text-center">
                    <p className="font-semibold text-sm">{day}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {getSchedulesForDay(day).length} sesiones
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-6">
              {/* Time Column */}
              <div className="border-r border-gray-200">
                {timeSlots.map(time => (
                  <div key={time} className="h-16 border-b border-gray-100 p-2 flex items-center">
                    <span className="text-xs text-gray-500">{time}</span>
                  </div>
                ))}
              </div>

              {/* Days Columns */}
              {days.map(day => (
                <div key={day} className="border-r border-gray-200 last:border-r-0 relative">
                  {/* Time grid lines */}
                  {timeSlots.map(time => (
                    <div key={time} className="h-16 border-b border-gray-100"></div>
                  ))}

                  {/* Schedule blocks */}
                  <div className="absolute inset-0 pointer-events-none">
                    {getSchedulesForDay(day).map(slot => {
                      const top = getTimeSlotPosition(slot.startTime);
                      const height = getSlotHeight(slot.startTime, slot.endTime);

                      return (
                        <div
                          key={slot.id}
                          className="absolute left-1 right-1 pointer-events-auto"
                          style={{
                            top: `${top}px`,
                            height: `${height}px`
                          }}
                        >
                          <div
                            className={`h-full rounded-lg p-2 border-l-4 ${
                              slot.type === 'disponible'
                                ? 'bg-green-50 border-green-500'
                                : 'bg-blue-50 border-blue-500'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold truncate">
                                  {slot.startTime} - {slot.endTime}
                                </p>
                                <p className="text-xs text-gray-600 truncate">{slot.location}</p>
                                {slot.studentName && (
                                  <p className="text-xs font-medium text-blue-700 mt-1 truncate">
                                    {slot.studentName}
                                  </p>
                                )}
                              </div>
                              {slot.type === 'disponible' && (
                                <div className="flex gap-1 ml-1">
                                  <button
                                    onClick={() => openEditModal(slot)}
                                    className="p-1 hover:bg-white rounded"
                                  >
                                    <Edit className="w-3 h-3 text-gray-600" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSchedule(slot.id)}
                                    className="p-1 hover:bg-white rounded"
                                  >
                                    <Trash2 className="w-3 h-3 text-red-600" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              slot.type === 'disponible'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {slot.type === 'disponible' ? 'Disponible' : 'Ocupado'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-50 border-l-4 border-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-50 border-l-4 border-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Ocupado (con estudiante)</span>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingSlot) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">
                {editingSlot ? 'Editar horario' : 'Agregar disponibilidad'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Día de la semana
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona un día</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora inicio
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora fin
                  </label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej: Aula 301, Virtual, etc."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={editingSlot ? handleEditSchedule : handleAddSchedule}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingSlot ? 'Guardar cambios' : 'Agregar horario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
