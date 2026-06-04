import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, User, Plus, Trash2, Edit, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AgendaEvent {
  id: number;
  title: string;
  day: number;
  time: string;
  tutor: string;
  location: string;
  color: string;
}

export function StudentAgendaView() {
  const [events, setEvents] = useState<AgendaEvent[]>(() => {
    const saved = localStorage.getItem('agenda-junio-2026');
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', day: '', time: '', tutor: '', location: '' });

  useEffect(() => {
    localStorage.setItem('agenda-junio-2026', JSON.stringify(events));
  }, [events]);

  const saveEvent = () => {
    if (editingId) {
      // Si estamos editando
      setEvents(events.map(e => e.id === editingId ? { ...e, ...form, day: parseInt(form.day as any) } : e));
    } else {
      // Si estamos creando uno nuevo
      const colors = ['bg-blue-100 text-blue-700 border-blue-300', 'bg-green-100 text-green-700 border-green-300', 'bg-purple-100 text-purple-700 border-purple-300'];
      setEvents([...events, { id: Date.now(), ...form, day: parseInt(form.day as any), color: colors[events.length % colors.length] }]);
    }
    closeModal();
  };

  const openEdit = (e: AgendaEvent) => {
    setEditingId(e.id);
    setForm({ title: e.title, day: e.day.toString(), time: e.time, tutor: e.tutor, location: e.location });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm({ title: '', day: '', time: '', tutor: '', location: '' });
  };

  const deleteEvent = (id: number) => setEvents(events.filter(e => e.id !== id));

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Mi agenda</h2>
          <p className="text-sm text-gray-600">Junio 2026</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Agregar evento
        </button>
      </div>

      {/* Modal Reutilizable (Crear/Editar) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold">{editingId ? 'Editar Evento' : 'Nuevo Evento'}</h3>
                <button onClick={closeModal}><X className="w-5 h-5"/></button>
            </div>
            <input className="w-full border p-2 rounded" placeholder="Nombre de la asesoría" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            <input className="w-full border p-2 rounded" type="number" placeholder="Día" value={form.day} onChange={e => setForm({...form, day: e.target.value})} />
            <input className="w-full border p-2 rounded" placeholder="Hora" value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
            <input className="w-full border p-2 rounded" placeholder="Maestro" value={form.tutor} onChange={e => setForm({...form, tutor: e.target.value})} />
            <input className="w-full border p-2 rounded" placeholder="Lugar" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            <button onClick={saveEvent} className="w-full bg-blue-600 text-white p-2 rounded">
                {editingId ? 'Guardar Cambios' : 'Crear Evento'}
            </button>
          </div>
        </div>
      )}

      {/* Grid Calendario y Sesiones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">

           {/* ... contenido del calendario igual ... */}
           <div className="grid grid-cols-7 gap-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => <div key={d} className="text-center text-sm font-medium text-gray-600 pb-2">{d}</div>)}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const dayEvents = events.filter(e => e.day === day);
              return (
                <div key={day} className="aspect-square border rounded-lg p-1 text-xs">
                  {day}
                  {dayEvents.map(e => <div key={e.id} className={`p-0.5 rounded truncate ${e.color}`}>{e.title}</div>)}
                </div>
              );
            })}
          </div>
        </div>


        <div className="space-y-4">
          <h3 className="font-semibold">Próximas sesiones</h3>
          {events.sort((a,b) => a.day - b.day).map(s => (
            <div key={s.id} className={`p-4 rounded-lg border ${s.color}`}>
              <h4 className="font-medium text-sm">Jueves {s.day} de Junio - {s.title}</h4>
              <p className="text-xs italic">{s.tutor} | {s.location} | {s.time}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openEdit(s)} className="text-xs underline flex items-center gap-1"><Edit className="w-3 h-3"/> Editar</button>
                <button onClick={() => deleteEvent(s.id)} className="text-xs text-red-600 flex items-center gap-1"><Trash2 className="w-3 h-3"/> Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
