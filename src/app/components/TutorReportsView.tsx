import { Users, CheckCircle, AlertTriangle, Download, FileText, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function TutorReportsView() {
  const performanceData = [
    { mes: 'Ene', promedio: 8.2 },
    { mes: 'Feb', promedio: 8.5 },
    { mes: 'Mar', promedio: 8.3 },
    { mes: 'Abr', promedio: 8.7 },
    { mes: 'May', promedio: 8.9 }
  ];

  const progressData = [
    { estudiante: 'Ana Laura', inicial: 7.2, actual: 7.8 },
    { estudiante: 'Carlos', inicial: 8.0, actual: 8.5 },
    { estudiante: 'María', inicial: 8.3, actual: 8.7 },
    { estudiante: 'Roberto', inicial: 9.0, actual: 9.3 },
    { estudiante: 'Laura', inicial: 8.8, actual: 9.1 }
  ];

  const students = [
    { name: 'Ana Laura Gómez', status: 'Bajo', average: 7.8, sessions: 8, progress: '+0.6' },
    { name: 'Carlos Méndez Ruiz', status: 'Medio', average: 8.5, sessions: 12, progress: '+0.5' },
    { name: 'María Fernández López', status: 'Medio', average: 8.7, sessions: 6, progress: '+0.4' },
    { name: 'Roberto Silva García', status: 'Alto', average: 9.3, sessions: 15, progress: '+0.3' },
    { name: 'Laura Hernández Cruz', status: 'Alto', average: 9.1, sessions: 10, progress: '+0.3' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alto': return 'bg-green-100 text-green-700';
      case 'Medio': return 'bg-yellow-100 text-yellow-700';
      case 'Bajo': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Reportes y análisis</h2>
          <p className="text-sm text-gray-600">Dashboard analítico de desempeño</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FileText className="w-4 h-4" />
            Generar reporte
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-blue-100 text-sm mb-1">Número de sesiones</p>
          <p className="font-semibold mb-2">28 sesiones</p>
          <p className="text-xs text-blue-100">+12% vs mes anterior</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-green-100 text-sm mb-1">Estudiantes atendidos</p>
          <p className="font-semibold mb-2">16 estudiantes</p>
          <p className="text-xs text-green-100">100% de asistencia</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Atención</span>
          </div>
          <p className="text-orange-100 text-sm mb-1">Estudiantes en riesgo</p>
          <p className="font-semibold mb-2">3 estudiantes</p>
          <p className="text-xs text-orange-100">Requieren seguimiento</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Rendimiento académico promedio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis domain={[7, 10]} stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="promedio"
                name="Promedio"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Progreso de estudiantes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="estudiante" stroke="#6b7280" />
              <YAxis domain={[6, 10]} stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="inicial" name="Inicial" fill="#94a3b8" />
              <Bar dataKey="actual" name="Actual" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Students Status Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold">Estado académico de estudiantes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estudiante</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Promedio actual</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Sesiones</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Progreso</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estado</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium text-sm">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-blue-600">{student.average}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">{student.sessions}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-green-600">{student.progress}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 mb-1">Promedio general</p>
          <p className="font-semibold">8.66</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-600 mb-1">Tasa de aprobación</p>
          <p className="font-semibold">94%</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
          <p className="text-sm text-gray-600 mb-1">Horas de tutoría</p>
          <p className="font-semibold">42h</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-orange-500">
          <p className="text-sm text-gray-600 mb-1">Satisfacción</p>
          <p className="font-semibold">4.8/5.0</p>
        </div>
      </div>
    </div>
  );
}
