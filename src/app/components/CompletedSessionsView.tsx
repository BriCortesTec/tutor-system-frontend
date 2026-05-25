import { useState } from 'react';
import { Search, Filter, Eye, Calendar, X, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

interface Session {
  id: number;
  date: string;
  student: string;
  topic: string;
  observations: string;
  status: 'Completada' | 'Cancelada';
  duration: string;
  location: string;
  materials: string[];
}

export function CompletedSessionsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Todas');
  const [filterDate, setFilterDate] = useState('');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const sessions: Session[] = [
    {
      id: 1,
      date: '22 mayo 2026',
      student: 'Ana Laura Gómez',
      topic: 'Cálculo diferencial - Derivadas',
      observations: 'La estudiante muestra dificultad en derivadas parciales. Se recomienda práctica adicional con ejercicios de aplicación.',
      status: 'Completada',
      duration: '1.5 horas',
      location: 'Aula 301',
      materials: ['Ejercicios de práctica', 'Guía de derivadas']
    },
    {
      id: 2,
      date: '21 mayo 2026',
      student: 'Carlos Méndez Ruiz',
      topic: 'Álgebra lineal - Matrices',
      observations: 'Excelente progreso. El estudiante comprendió operaciones con matrices y sistemas de ecuaciones.',
      status: 'Completada',
      duration: '2 horas',
      location: 'Virtual',
      materials: ['Presentación PPT', 'Ejercicios resueltos']
    },
    {
      id: 3,
      date: '20 mayo 2026',
      student: 'María Fernández López',
      topic: 'Física I - Cinemática',
      observations: 'Sesión cancelada por el estudiante. Se reprogramó para la próxima semana.',
      status: 'Cancelada',
      duration: '1 hora',
      location: 'Aula 205',
      materials: []
    },
    {
      id: 4,
      date: '19 mayo 2026',
      student: 'Roberto Silva García',
      topic: 'Programación - Estructuras de datos',
      observations: 'Estudiante avanzado. Se cubrieron listas enlazadas y árboles binarios con implementación en Python.',
      status: 'Completada',
      duration: '2 horas',
      location: 'Virtual',
      materials: ['Código fuente', 'Documentación técnica']
    },
    {
      id: 5,
      date: '18 mayo 2026',
      student: 'Laura Hernández Cruz',
      topic: 'Química orgánica - Nomenclatura',
      observations: 'Buena comprensión de nomenclatura básica. Se requiere refuerzo en compuestos complejos.',
      status: 'Completada',
      duration: '1 hora',
      location: 'Aula 301',
      materials: ['Tabla de nomenclatura', 'Ejercicios prácticos']
    },
    {
      id: 6,
      date: '17 mayo 2026',
      student: 'Pedro Sánchez Ruiz',
      topic: 'Matemáticas básicas - Álgebra',
      observations: 'Estudiante no asistió a la sesión. Se intentó contactar sin éxito.',
      status: 'Cancelada',
      duration: '1 hora',
      location: 'Aula 205',
      materials: []
    },
    {
      id: 7,
      date: '16 mayo 2026',
      student: 'Diana Morales Torres',
      topic: 'Estadística - Probabilidad',
      observations: 'Sesión productiva. La estudiante logró resolver problemas de probabilidad condicional.',
      status: 'Completada',
      duration: '1.5 horas',
      location: 'Virtual',
      materials: ['Ejercicios de probabilidad', 'Formulario']
    },
    {
      id: 8,
      date: '15 mayo 2026',
      student: 'Miguel Ángel Vargas',
      topic: 'Mecánica - Dinámica',
      observations: 'Excelente desempeño. El estudiante resolvió problemas de segunda ley de Newton sin dificultad.',
      status: 'Completada',
      duration: '2 horas',
      location: 'Aula 301',
      materials: ['Problemas resueltos', 'Simulaciones']
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'Completada'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';
  };

  const getStatusIcon = (status: string) => {
    return status === 'Completada' ? CheckCircle : XCircle;
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'Todas' || session.status === filterStatus;
    const matchesDate = !filterDate || session.date.includes(filterDate);
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Sesiones realizadas</h2>
          <p className="text-sm text-gray-600">Historial completo de tutorías</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Total: <span className="font-semibold">{sessions.length}</span> sesiones
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sesiones completadas</p>
              <p className="font-semibold">
                {sessions.filter(s => s.status === 'Completada').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-3 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sesiones canceladas</p>
              <p className="font-semibold">
                {sessions.filter(s => s.status === 'Cancelada').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Horas totales</p>
              <p className="font-semibold">
                {sessions.reduce((acc, s) => acc + parseFloat(s.duration), 0).toFixed(1)}h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por estudiante o tema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Todas</option>
              <option>Completada</option>
              <option>Cancelada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Fecha</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estudiante</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tema</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Duración</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estado</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => {
                const StatusIcon = getStatusIcon(session.status);
                return (
                  <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-700">{session.date}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {session.student.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-sm font-medium">{session.student}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">{session.topic}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{session.duration}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 w-fit ${getStatusColor(session.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {session.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron sesiones con estos criterios.</p>
          </div>
        )}
      </div>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div>
                <h3 className="font-semibold mb-2">{selectedSession.topic}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{selectedSession.date}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(selectedSession.status)}`}>
                    {selectedSession.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Student Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900 mb-2">Estudiante</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {selectedSession.student.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium">{selectedSession.student}</p>
                    <p className="text-sm text-gray-600">{selectedSession.location}</p>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-700">Duración</p>
                  </div>
                  <p className="font-semibold">{selectedSession.duration}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-700">Ubicación</p>
                  </div>
                  <p className="font-semibold">{selectedSession.location}</p>
                </div>
              </div>

              {/* Observations */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Observaciones
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">{selectedSession.observations}</p>
                </div>
              </div>

              {/* Materials */}
              {selectedSession.materials.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Material utilizado</h4>
                  <div className="space-y-2">
                    {selectedSession.materials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-700">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedSession(null)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
