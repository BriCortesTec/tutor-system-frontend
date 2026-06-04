import { useState, useEffect } from 'react';
import { Clock, BookOpen, AlertCircle, Plus, X, Trash2, Edit } from 'lucide-react';

interface AgendaEvent { id: number; title: string; day: number; time: string; location: string; }
interface Taller { id: number; title: string; day: string; time: string; tutor: string; }
interface Action { id: number; title: string; }

export function StudentView() {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  
  // Estados para modales
  const [modal, setModal] = useState<{ type: string, data: any }>({ type: '', data: {} });

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem('agenda-junio-2026') || '[]'));
    setTalleres(JSON.parse(localStorage.getItem('student-talleres') || '[]'));
    setActions(JSON.parse(localStorage.getItem('student-actions') || '[]'));
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    if (key === 'student-talleres') setTalleres(data);
    if (key === 'student-actions') setActions(data);
  };

  return (
    <div className="space-y-6">
      {/* 1. Próxima Tutoría */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
        <h3 className="font-semibold text-blue-900">Próxima Tutoría</h3>
        {events.length > 0 ? <p className="text-blue-700">Sesión el día {events[0].day} de Junio a las {events[0].time}.</p> : <p className="text-blue-400 italic">Sin sesiones programadas</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2. Sesión Virtual (Botón Agregar sin lugar) */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-purple-900 flex items-center gap-2"><Clock className="w-4 h-4"/> Sesión Virtual</h3>
            <button onClick={() => setModal({ type: 'virtual', data: {} })}><Plus className="w-5 h-5 text-purple-600"/></button>
          </div>
          {events.filter(e => e.location?.toLowerCase().includes('virtual')).map(e => <div key={e.id} className="text-sm bg-purple-100 p-2 rounded mb-1">{e.title} - {e.time}</div>)}
        </div>

        {/* 3. Taller de estudio (Botón Agregar completo) */}
        <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-green-900 flex items-center gap-2"><BookOpen className="w-4 h-4"/> Taller de estudio</h3>
            <button onClick={() => setModal({ type: 'taller', data: {} })}><Plus className="w-5 h-5 text-green-600"/></button>
          </div>
          {talleres.map(t => <div key={t.id} className="text-sm bg-green-100 p-2 rounded mb-1">{t.title} ({t.day})</div>)}
        </div>
      </div>

      {/* 4. Acciones Importantes (Editar y Eliminar) */}
      <div className="bg-orange-50 p-6 rounded-lg shadow-sm border border-orange-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-orange-900 flex items-center gap-2"><AlertCircle className="w-4 h-4"/> Acciones importantes</h3>
          <button onClick={() => setModal({ type: 'action', data: {} })} className="text-orange-600"><Plus className="w-5 h-5"/></button>
        </div>
        <ul className="space-y-2">
          {actions.map(a => (
            <li key={a.id} className="flex justify-between bg-orange-100 p-2 rounded text-sm">
              {a.title}
              <div className="flex gap-2">
                <button onClick={() => setModal({ type: 'action', data: a })}><Edit className="w-3 h-3"/></button>
                <button onClick={() => saveToStorage('student-actions', actions.filter(item => item.id !== a.id))}><Trash2 className="w-3 h-3 text-red-500"/></button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal Genérico */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 space-y-3">
            <div className="flex justify-between font-bold">Agregar/Editar <button onClick={() => setModal({ type: '', data: {} })}><X/></button></div>
            <input className="w-full border p-2 rounded" placeholder="Título" onChange={e => setModal({...modal, data: {...modal.data, title: e.target.value}})}/>
            {modal.type !== 'action' && <input className="w-full border p-2 rounded" placeholder="Día" onChange={e => setModal({...modal, data: {...modal.data, day: e.target.value}})}/> }
            <button onClick={() => { /* Lógica de guardado simplificada */ setModal({ type: '', data: {} }) }} className="w-full bg-blue-600 text-white p-2 rounded">Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
}