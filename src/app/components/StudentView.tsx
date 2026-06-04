import { useState, useEffect } from 'react';
import { Clock, BookOpen, AlertCircle, Plus, Trash2, Edit, X } from 'lucide-react';

interface AgendaEvent { 
  id: number; 
  title: string; 
  day: string; 
  time: string; 
  tutor: string; 
  location: string; 
  type: 'virtual' | 'taller' | 'action'; 
}

export function StudentView() {
  const [items, setItems] = useState<AgendaEvent[]>([]);
  const [agendaEvents, setAgendaEvents] = useState<any[]>([]);
  const [modal, setModal] = useState<{ open: boolean; type: string; data: Partial<AgendaEvent> | null }>({ 
    open: false, type: '', data: null 
  });
  const cargarSesiones = async () => {

    const idAlumno =
      localStorage.getItem("idAlumno");

    const response = await fetch(
      `http://127.0.0.1/tutores-api/obtener_sesiones_alumno.php?id_alumno=${idAlumno}`
    );

    const data = await response.json();

    setAgendaEvents(data);

  };

  useEffect(() => {

    setItems(
      JSON.parse(
        localStorage.getItem('student-data') || '[]'
      )
    );

    cargarSesiones();

  }, []);

  const saveItem = () => {
    if (!modal.data?.title) return;
    const newItem = { ...modal.data, id: modal.data.id || Date.now(), type: modal.type };
    const updated = modal.data.id 
      ? items.map(i => i.id === modal.data?.id ? newItem : i) 
      : [...items, newItem];
    
    setItems(updated as AgendaEvent[]);
    localStorage.setItem('student-data', JSON.stringify(updated));
    setModal({ open: false, type: '', data: null });
  };

  const deleteItem = (id: number) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    localStorage.setItem('student-data', JSON.stringify(updated));
  };
    useEffect(() => {

  const actualizar = () => {

    cargarSesiones();

  };

  window.addEventListener(
    "sesionesActualizadas",
    actualizar
  );

  return () => {

    window.removeEventListener(
      "sesionesActualizadas",
      actualizar
    );

  };

}, []);

  return (
    <div className="space-y-6">    
      {/* 1. Próxima Tutoría */}
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-500 max-w-md ">
        <h3 className="font-semibold text-lg text-blue-900 mb-2">
          Próxima Tutoría
        </h3>

        {agendaEvents.length > 0 ? (

          <div className="space-y-1 text-sm">

            <p>
              <span className="font-semibold text-blue-800">
                Materia:
              </span>
              {" "}
              {agendaEvents[0].tema}
            </p>

            <p>
              <span className="font-semibold text-blue-800">
                Fecha:
              </span>
              {" "}
              {agendaEvents[0].fecha}
            </p>

            <p>
              <span className="font-semibold text-blue-800">
                Lugar:
              </span>
              {" "}
              {agendaEvents[0].lugar}
            </p>

            <p>
              <span className="font-semibold text-blue-800">
                Estado:
              </span>
              {" "}
              {agendaEvents[0].estado}
            </p>

          </div>

        ) : (

          <p className="text-gray-500 italic">
            Sin sesiones programadas.
          </p>

        )}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2. Sesiones Virtuales (Con Editar/Eliminar) */}
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-purple-900 flex items-center gap-2"><Clock className="w-4 h-4"/> Sesiones Virtuales</h3>
            <button onClick={() => setModal({ open: true, type: 'virtual', data: {} })} className="bg-purple-100 p-1 rounded-full"><Plus className="w-5 h-5 text-purple-700"/></button>
          </div>
          {items.filter(i => i.type === 'virtual').map(i => (
            <div key={i.id} className="bg-white p-3 rounded shadow-sm mb-2 border-l-4 border-purple-400 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-purple-800">{i.title}</p>
                <p className="text-xs text-gray-600">Mtro: {i.tutor} | {i.time}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setModal({ open: true, type: 'virtual', data: i })}><Edit className="w-4 h-4 text-blue-500"/></button>
                <button onClick={() => deleteItem(i.id)}><Trash2 className="w-4 h-4 text-red-500"/></button>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Talleres de Estudio (Con Editar/Eliminar) */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-green-900 flex items-center gap-2"><BookOpen className="w-4 h-4"/> Talleres de Estudio</h3>
            <button onClick={() => setModal({ open: true, type: 'taller', data: {} })} className="bg-green-100 p-1 rounded-full"><Plus className="w-5 h-5 text-green-700"/></button>
          </div>
          {items.filter(i => i.type === 'taller').map(i => (
            <div key={i.id} className="bg-white p-3 rounded shadow-sm mb-2 border-l-4 border-green-400 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-green-800">{i.title}</p>
                <p className="text-xs text-gray-600">Mtro: {i.tutor} | Lugar: {i.location} | {i.time}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setModal({ open: true, type: 'taller', data: i })}><Edit className="w-4 h-4 text-blue-500"/></button>
                <button onClick={() => deleteItem(i.id)}><Trash2 className="w-4 h-4 text-red-500"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Acciones Importantes (Intacta) */}
      <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-orange-900 flex items-center gap-2"><AlertCircle className="w-4 h-4"/> Acciones importantes</h3>
          <button onClick={() => setModal({ open: true, type: 'action', data: {} })} className="bg-orange-100 p-1 rounded-full"><Plus className="w-5 h-5 text-orange-700"/></button>
        </div>
        {items.filter(i => i.type === 'action').map(a => (
          <div key={a.id} className="flex justify-between bg-white p-3 rounded mb-2 shadow-sm text-sm border-l-4 border-orange-400">
            {a.title}
            <div className="flex gap-2">
              <button onClick={() => setModal({ open: true, type: 'action', data: a })}><Edit className="w-3 h-3 text-blue-500"/></button>
              <button onClick={() => deleteItem(a.id)}><Trash2 className="w-3 h-3 text-red-500"/></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Unificado */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 space-y-3">
            <h3 className="font-bold mb-2">{modal.data?.id ? 'Editar' : 'Agregar'} {modal.type}</h3>
            <input className="w-full border p-2 rounded" placeholder="Título/Materia" value={modal.data?.title || ''} onChange={e => setModal({...modal, data: {...modal.data, title: e.target.value}})}/>
            {modal.type !== 'action' && (
              <>
                <input className="w-full border p-2 rounded" placeholder="Maestro" value={modal.data?.tutor || ''} onChange={e => setModal({...modal, data: {...modal.data, tutor: e.target.value}})}/>
                <input className="w-full border p-2 rounded" placeholder="Hora" value={modal.data?.time || ''} onChange={e => setModal({...modal, data: {...modal.data, time: e.target.value}})}/>
                {modal.type === 'taller' && <input className="w-full border p-2 rounded" placeholder="Lugar" value={modal.data?.location || ''} onChange={e => setModal({...modal, data: {...modal.data, location: e.target.value}})}/> }
              </>
            )}
            <button onClick={saveItem} className="w-full bg-blue-600 text-white p-2 rounded">Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
}