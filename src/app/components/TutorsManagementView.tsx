import { Users, CheckCircle, Clock, Star, AlertTriangle, Search, Filter, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function TutorsManagementView() {
  const statusData = [
    { id: '1', name: 'Activos', value: 38, color: '#22c55e' },
    { id: '2', name: 'Inactivos', value: 4, color: '#ef4444' }
  ];

  const tutoriasByMonth = [
    { mes: 'Ene', tutorias: 85 },
    { mes: 'Feb', tutorias: 120 },
    { mes: 'Mar', tutorias: 98 },
    { mes: 'Abr', tutorias: 145 },
    { mes: 'May', tutorias: 132 },
    { mes: 'Jun', tutorias: 110 }
  ];

  const tutors = [
    {
      id: 1,
      name: 'Mtro. Javier López',
      email: 'javier.lopez@universidad.edu',
      specialty: 'Matemáticas',
      students: 16,
      sessions: 28,
      rating: 4.9,
      status: 'Activo'
    },
    {
      id: 2,
      name: 'Mtra. Elena Torres',
      email: 'elena.torres@universidad.edu',
      specialty: 'Química',
      students: 14,
      sessions: 25,
      rating: 4.8,
      status: 'Activo'
    },
    {
      id: 3,
      name: 'Mtro. Carlos Ramírez',
      email: 'carlos.ramirez@universidad.edu',
      specialty: 'Programación',
      students: 18,
      sessions: 32,
      rating: 4.7,
      status: 'Activo'
    },
    {
      id: 4,
      name: 'Mtra. Ana Martínez',
      email: 'ana.martinez@universidad.edu',
      specialty: 'Inglés',
      students: 20,
      sessions: 35,
      rating: 4.9,
      status: 'Activo'
    },
    {
      id: 5,
      name: 'Mtro. Luis Fernández',
      email: 'luis.fernandez@universidad.edu',
      specialty: 'Física',
      students: 12,
      sessions: 22,
      rating: 4.6,
      status: 'Inactivo'
    }
  ];

  const topTutors = [
    { name: 'Mtra. Ana Martínez', rating: 4.9, sessions: 35 },
    { name: 'Mtro. Javier López', rating: 4.9, sessions: 28 },
    { name: 'Mtra. Elena Torres', rating: 4.8, sessions: 25 },
    { name: 'Mtro. Carlos Ramírez', rating: 4.7, sessions: 32 },
    { name: 'Mtro. Luis Fernández', rating: 4.6, sessions: 22 }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Gestión de Tutores</h2>
          <p className="text-sm text-gray-600">Administra y monitorea el desempeño de tutores</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Agregar tutor
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
              <p className="text-sm text-gray-600">Total tutores</p>
              <p className="font-semibold">42</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tutores activos</p>
              <p className="font-semibold">38</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Horas promedio</p>
              <p className="font-semibold">15</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Calificación promedio</p>
              <p className="font-semibold">4.8/5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-3 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reportes pendientes</p>
              <p className="font-semibold">7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Top Tutors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tutors by Status */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Tutores por estado</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
              >
                {statusData.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry: any) => `${value}: ${entry.payload.value}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sessions by Month */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Tutorías por mes</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tutoriasByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="tutorias" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Tutors */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Mejores tutores</h3>
            <button className="text-blue-600 text-sm hover:underline">Ver todos</button>
          </div>
          <div className="space-y-3">
            {topTutors.map((tutor, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-500 w-6">{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{tutor.name}</p>
                    <p className="text-xs text-gray-500">{tutor.sessions} sesiones</p>
                  </div>
                </div>
                {renderStars(Math.floor(tutor.rating))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tutors Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold">Lista de tutores</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar tutor..."
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
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tutor</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Especialidad</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estudiantes</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Sesiones</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Calificación</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estado</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor) => (
                <tr key={tutor.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {tutor.name.split(' ')[1]?.charAt(0)}{tutor.name.split(' ')[2]?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tutor.name}</p>
                        <p className="text-xs text-gray-500">{tutor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">{tutor.specialty}</td>
                  <td className="py-4 px-6 text-sm font-medium">{tutor.students}</td>
                  <td className="py-4 px-6 text-sm font-medium">{tutor.sessions}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{tutor.rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      tutor.status === 'Activo'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {tutor.status}
                    </span>
                  </td>
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
