import { Users, CheckCircle, TrendingUp, Clock, AlertTriangle, Search, Filter, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from "react";

export function StudentsManagementView() {
  const [alumnos, setAlumnos] = useState([]);
  useEffect(() => {

  fetch("http://127.0.0.1/tutores-api/obtener_alumnos.php")
    .then((response) => response.json())
    .then((data) => {

      console.log(data);

      setAlumnos(data);

    });

}, []);
  const riskData = [
    { id: '1', name: 'Sin riesgo', value: 203, color: '#3b82f6' },
    { id: '2', name: 'Riesgo bajo', value: 187, color: '#22c55e' },
    { id: '3', name: 'Riesgo medio', value: 95, color: '#f59e0b' },
    { id: '4', name: 'Riesgo alto', value: 38, color: '#ef4444' }
  ];

  const semesterData = [
    { semestre: '1er', estudiantes: 120 },
    { semestre: '2do', estudiantes: 98 },
    { semestre: '3er', estudiantes: 145 },
    { semestre: '4to', estudiantes: 87 },
    { semestre: '5to', estudiantes: 42 },
    { semestre: '6to', estudiantes: 31 }
  ];



  const atRiskStudents = [
    { name: 'Pedro Sánchez Ruiz', reason: 'Promedio bajo (7.2)', level: 'Alto' },
    { name: 'Diana Morales Torres', reason: 'Ausentismo frecuente', level: 'Alto' },
    { name: 'Jorge Ramírez Luna', reason: 'Bajo rendimiento matemáticas', level: 'Medio' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sin riesgo':
        return 'bg-blue-100 text-blue-700';
      case 'Riesgo bajo':
        return 'bg-green-100 text-green-700';
      case 'Riesgo medio':
        return 'bg-yellow-100 text-yellow-700';
      case 'Riesgo alto':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getAverageColor = (average: number) => {
    if (average >= 9) return 'text-green-600';
    if (average >= 8) return 'text-blue-600';
    if (average >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Gestión de Estudiantes</h2>
          <p className="text-sm text-gray-600">Administra y monitorea el desempeño de estudiantes</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Agregar estudiante
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total estudiantes</p>
              <p className="font-semibold">523</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Estudiantes activos</p>
              <p className="font-semibold">38</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Promedio académico</p>
              <p className="font-semibold">8.4</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de horas</p>
              <p className="font-semibold">1,248</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-3 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Estudiantes en riesgo</p>
              <p className="font-semibold">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and At Risk Students */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Estudiantes por nivel de riesgo</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
              >
                {riskData.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => value}
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Semester Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Distribución por semestre</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={semesterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="semestre" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="estudiantes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* At Risk Students */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Estudiantes en riesgo</h3>
            <button className="text-blue-600 text-sm hover:underline">Ver todos</button>
          </div>
          <div className="space-y-3">
            {atRiskStudents.map((student, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                student.level === 'Alto' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium">{student.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    student.level === 'Alto' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {student.level}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{student.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold">Lista de estudiantes</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar estudiante..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estudiante</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Matrícula</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Carrera</th>
                // <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Semestre</th>
                //<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Promedio</th>
                //<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tutor</th>
                //<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estado</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno: any) => (
                <tr key={alumno.nombre} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {alumno.nombre
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')
                        .slice(0, 2)}
                      </div>
                      <span className="font-medium text-sm">{alumno.nombre}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{alumno.matricula}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{alumno.carrera}</td>
                  

                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
