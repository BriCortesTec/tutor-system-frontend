import { CheckCircle, Clock, Users, FileText, Video, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export function StudentTutoriasView() {

const [events, setEvents] = useState<any[]>([]);
  // Filtramos eventos por tipo para las secciones
  const scheduledSessions = events.filter(e => !e.type || e.type === 'tutoría');
  

useEffect(() => {

  cargarTutorias();

}, []);

const cargarTutorias = async () => {

  const idAlumno =
    localStorage.getItem("idAlumno");

  const response = await fetch(
    `http://127.0.0.1/tutores-api/obtener_tutorias_alumno.php?id_alumno=${idAlumno}`
  );

  const data = await response.json();

  console.log("TUTORIAS:", data);

  setEvents(data);

};
  const recentActivities = [
    { title: 'Tutoría programada', desc: 'Se ha registrado una nueva sesión en tu agenda.', icon: Calendar, color: 'text-purple-600' },
    { title: 'Sesión virtual', desc: 'Se agregó una sesión virtual a tu panel de inicio.', icon: Video, color: 'text-blue-600' },
    { title: 'Taller de estudio', desc: 'Se registró un nuevo taller académico.', icon: Users, color: 'text-green-600' }
  ];



  return (
    <div className="space-y-6">

      <div>

        <h2 className="font-semibold mb-1">Mis tutorías</h2>
        <p className="text-sm text-gray-600">Seguimiento detallado de tus sesiones y actividades</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal: Sesiones y Tabla */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Sesiones programadas</h3>
            <div className="space-y-3">
              {scheduledSessions.map((s, i) => (
                <div key={i} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <h4 className="font-medium text-sm">{s.tema}</h4>
                    <p className="text-xs text-gray-500">{s.tutor} • {s.fecha} de Junio, {s.hora}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
  {s.estado}
</span>
                </div>
              ))}
            </div>
          </div>


          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b"><h3 className="font-semibold">Estado de mis tutorías</h3></div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6">Tutor</th>
                  <th className="text-left py-3 px-6">Materia</th>
                  <th className="text-left py-3 px-6">Estado</th>
                </tr>
              </thead>
              <tbody>
                {scheduledSessions.map((s, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 px-6">{s.tutor}</td>
                    <td className="py-3 px-6">{s.tema}</td>
                    <td className="py-3 px-6 text-green-600">
  {s.estado}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Columna derecha: Actividades Recientes */}
        <div className="space-y-6">

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Actividades recientes</h3>
            <div className="space-y-4">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg h-fit"><act.icon className={`w-4 h-4 ${act.color}`} /></div>
                  <div>
                    <p className="text-sm font-medium">{act.title}</p>
                    <p className="text-xs text-gray-500">{act.desc}</p>
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