import { useState } from 'react';
import { Search, Filter, Eye, Calendar, X, Clock, FileText, AlertCircle, TrendingUp, CheckCircle, Loader2 } from 'lucide-react';

const API_BASE = 'http://127.0.0.1/tutores-api';

// Detecta el periodo según el mes actual
function getPeriodo(): string {
  const mes = new Date().getMonth() + 1; // 1-12
  if (mes >= 1 && mes <= 6) return 'Enero – Junio ' + new Date().getFullYear();
  return 'Agosto – Diciembre ' + new Date().getFullYear();
}

interface Student {
  id: number;
  name: string;
  career: string;
  semester: string;
  average: number;
  status: 'Alto' | 'Medio' | 'Bajo';
  email: string;
  phone: string;
  tutoringSessions: number;
  lastSession: string;
}

export function MyStudentsView() {
  const [searchQuery, setSearchQuery]       = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [filterStatus, setFilterStatus]     = useState<string>('Todos');

  // Modal Registrar
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerStudent, setRegisterStudent]     = useState<Student | null>(null);
  const [regTema, setRegTema]       = useState('');
  const [regFecha, setRegFecha]     = useState(new Date().toISOString().split('T')[0]);
  const [regGuardando, setRegGuardando] = useState(false);
  const [regExito, setRegExito]     = useState(false);
  const [regError, setRegError]     = useState('');

  const periodo = getPeriodo();
  const idTutor = localStorage.getItem('idTutor') || 'TUT1';

  const students: Student[] = [
    { id: 1, name: 'Ana Laura Gómez',    career: 'Ingeniería en Software', semester: '4to Semestre', average: 7.2, status: 'Bajo',  email: 'ana.gomez@universidad.edu',      phone: '555-0101', tutoringSessions: 8,  lastSession: '15 mayo 2026' },
    { id: 2, name: 'Carlos Méndez Ruiz', career: 'Ingeniería Industrial',  semester: '5to Semestre', average: 8.1, status: 'Medio', email: 'carlos.mendez@universidad.edu',  phone: '555-0102', tutoringSessions: 12, lastSession: '18 mayo 2026' },
    { id: 3, name: 'María Fernández López', career: 'Arquitectura',        semester: '3er Semestre', average: 8.5, status: 'Medio', email: 'maria.fernandez@universidad.edu', phone: '555-0103', tutoringSessions: 6,  lastSession: '20 mayo 2026' },
    { id: 4, name: 'Roberto Silva García', career: 'Diseño Gráfico',       semester: '6to Semestre', average: 9.2, status: 'Alto',  email: 'roberto.silva@universidad.edu',  phone: '555-0104', tutoringSessions: 15, lastSession: '22 mayo 2026' },
    { id: 5, name: 'Laura Hernández Cruz', career: 'Ingeniería en Software', semester: '4to Semestre', average: 9.0, status: 'Alto', email: 'laura.hernandez@universidad.edu', phone: '555-0105', tutoringSessions: 10, lastSession: '21 mayo 2026' },
    { id: 6, name: 'Pedro Sánchez Ruiz',  career: 'Ingeniería Civil',      semester: '5to Semestre', average: 7.5, status: 'Bajo',  email: 'pedro.sanchez@universidad.edu',  phone: '555-0106', tutoringSessions: 9,  lastSession: '19 mayo 2026' },
    { id: 7, name: 'Diana Morales Torres', career: 'Administración',       semester: '3er Semestre', average: 8.3, status: 'Medio', email: 'diana.morales@universidad.edu',  phone: '555-0107', tutoringSessions: 7,  lastSession: '17 mayo 2026' },
    { id: 8, name: 'Miguel Ángel Vargas', career: 'Ingeniería Mecánica',   semester: '6to Semestre', average: 8.8, status: 'Alto',  email: 'miguel.vargas@universidad.edu',  phone: '555-0108', tutoringSessions: 14, lastSession: '23 mayo 2026' },
  ];

  const tutoringHistory = [
    { date: '15 mayo 2026', topic: 'Cálculo diferencial', duration: '1 hora',   notes: 'Estudiante muestra dificultad en derivadas. Se recomienda práctica adicional.', status: 'Completada' },
    { date: '8 mayo 2026',  topic: 'Álgebra lineal',      duration: '1.5 horas', notes: 'Buena comprensión de matrices. Necesita refuerzo en determinantes.',             status: 'Completada' },
    { date: '1 mayo 2026',  topic: 'Programación básica', duration: '2 horas',   notes: 'Excelente progreso en estructuras de control. Se avanzó a funciones.',           status: 'Completada' },
    { date: '24 abril 2026',topic: 'Física I',             duration: '1 hora',   notes: 'Revisión de cinemática. Estudiante logró resolver problemas complejos.',          status: 'Completada' },
  ];

  const observations = [
    { date: '18 mayo 2026', type: 'Progreso', text: 'El estudiante ha mostrado mejora significativa en las últimas 2 semanas.', priority: 'normal' },
    { date: '10 mayo 2026', type: 'Alerta',   text: 'Requiere atención especial en matemáticas. Promedio bajo en últimos exámenes.', priority: 'high' },
    { date: '3 mayo 2026',  type: 'Nota',     text: 'Estudiante interesado en proyectos extracurriculares de programación.', priority: 'normal' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alto':  return 'bg-green-100 text-green-700';
      case 'Medio': return 'bg-yellow-100 text-yellow-700';
      case 'Bajo':  return 'bg-red-100 text-red-700';
      default:      return 'bg-gray-100 text-gray-700';
    }
  };

  const getAverageColor = (avg: number) => {
    if (avg >= 9) return 'text-green-600';
    if (avg >= 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        s.career.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filterStatus === 'Todos' || s.status === filterStatus;
    return matchSearch && matchFilter;
  });

  // ── Abrir modal registrar ───────────────────────────────────────────────────
  const openRegister = (student: Student) => {
    setRegisterStudent(student);
    setRegTema('');
    setRegFecha(new Date().toISOString().split('T')[0]);
    setRegGuardando(false);
    setRegExito(false);
    setRegError('');
    setShowRegisterModal(true);
  };

  // ── Guardar sesión en la BD ─────────────────────────────────────────────────
  const handleRegistrar = async () => {
    if (!regTema.trim()) { setRegError('El tema es obligatorio.'); return; }
    if (!regFecha)       { setRegError('La fecha es obligatoria.'); return; }

    setRegGuardando(true);
    setRegError('');
    try {
      const res = await fetch(`${API_BASE}/registrar_sesion.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_tutor: idTutor, tema: regTema, fecha: regFecha }),
      });
      const data = await res.json();
      if (data.success) {
        setRegExito(true);
        setTimeout(() => { setShowRegisterModal(false); setRegExito(false); }, 1800);
      } else {
        setRegError('Error al guardar: ' + (data.error || 'intenta de nuevo.'));
      }
    } catch {
      setRegError('No se pudo conectar con el servidor.');
    } finally {
      setRegGuardando(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Mis estudiantes</h2>
          <p className="text-sm text-gray-600">Gestiona y da seguimiento a tus estudiantes</p>
        </div>
        <span className="text-sm text-gray-600">
          Total: <span className="font-semibold">{students.length}</span> estudiantes
        </span>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre o carrera..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Todos</option>
              <option>Alto</option>
              <option>Medio</option>
              <option>Bajo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nombre</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Carrera</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Semestre</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Promedio</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estado</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">{student.career}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{student.semester}</td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold ${getAverageColor(student.average)}`}>
                      {student.average.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Ver detalle
                      </button>
                      <button
                        onClick={() => openRegister(student)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm"
                      >
                        <Calendar className="w-4 h-4" />
                        Registrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron estudiantes con estos criterios.</p>
          </div>
        )}
      </div>

      {/* ── Modal Ver Detalle ─────────────────────────────────────────────────── */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-600">{selectedStudent.career}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(selectedStudent.status)}`}>
                      {selectedStudent.status}
                    </span>
                    <span className="text-sm text-gray-600">
                      Promedio: <span className={`font-semibold ${getAverageColor(selectedStudent.average)}`}>
                        {selectedStudent.average.toFixed(1)}
                      </span>
                    </span>
                    {/* PERIODO */}
                    <span className="text-xs px-3 py-1 rounded-full font-medium bg-indigo-100 text-indigo-700 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Periodo: {periodo}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Stats row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-medium text-blue-900">Tutorías</p>
                  </div>
                  <p className="font-semibold text-blue-600">{selectedStudent.tutoringSessions}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-medium text-green-900">Última sesión</p>
                  </div>
                  <p className="font-semibold text-green-600 text-sm">{selectedStudent.lastSession}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <p className="text-sm font-medium text-purple-900">Semestre</p>
                  </div>
                  <p className="font-semibold text-purple-600">{selectedStudent.semester}</p>
                </div>
                {/* Periodo destacado */}
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <p className="text-sm font-medium text-indigo-900">Periodo activo</p>
                  </div>
                  <p className="font-semibold text-indigo-600 text-sm">{periodo}</p>
                </div>
              </div>

              {/* Contacto */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Información de contacto</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Correo electrónico</p>
                    <p className="text-sm font-medium">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Teléfono</p>
                    <p className="text-sm font-medium">{selectedStudent.phone}</p>
                  </div>
                </div>
              </div>

              {/* Historial tutorías */}
              <div>
                <h4 className="font-semibold mb-3">Historial de tutorías — {periodo}</h4>
                <div className="space-y-3">
                  {tutoringHistory.map((session, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium text-sm">{session.topic}</h5>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500">{session.date}</span>
                            <span className="text-xs text-gray-500">• {session.duration}</span>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          {session.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{session.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <h4 className="font-semibold mb-3">Observaciones</h4>
                <div className="space-y-3">
                  {observations.map((obs, i) => (
                    <div key={i} className={`border-l-4 rounded-lg p-4 ${obs.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}`}>
                      <div className="flex items-start gap-3">
                        <AlertCircle className={`w-5 h-5 mt-0.5 ${obs.priority === 'high' ? 'text-red-600' : 'text-blue-600'}`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm">{obs.type}</span>
                            <span className="text-xs text-gray-500">{obs.date}</span>
                          </div>
                          <p className="text-sm text-gray-700">{obs.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cerrar
              </button>
              <button
                onClick={() => { setSelectedStudent(null); openRegister(selectedStudent); }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Registrar tutoría
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Registrar Sesión ────────────────────────────────────────────── */}
      {showRegisterModal && registerStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="font-semibold">Registrar tutoría</h3>
                <p className="text-sm text-gray-500 mt-0.5">{registerStudent.name}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 inline-block mt-1">
                  Periodo: {periodo}
                </span>
              </div>
              <button onClick={() => setShowRegisterModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {regExito ? (
              <div className="flex flex-col items-center py-8 gap-3 text-green-600">
                <CheckCircle className="w-12 h-12" />
                <p className="font-semibold">¡Sesión registrada correctamente!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tema de la sesión</label>
                  <input
                    type="text"
                    value={regTema}
                    onChange={e => setRegTema(e.target.value)}
                    placeholder="Ej: Cálculo diferencial, Álgebra lineal..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={regFecha}
                    onChange={e => setRegFecha(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {regError && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{regError}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowRegisterModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleRegistrar}
                    disabled={regGuardando}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {regGuardando
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
                      : <><Calendar className="w-4 h-4" /> Registrar</>
                    }
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
