import { Calendar, TrendingUp, Award, CheckCircle2, AlertCircle, FileText, Video, BookOpen, Bell } from 'lucide-react';

export function StudentView() {
  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Próxima tutoría</p>
              <p className="font-semibold">15 mayo</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Promedio académico</p>
              <p className="font-semibold">8.6</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado de tutoría</p>
              <p className="font-semibold">Bajo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Próximos eventos</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border-l-4 border-blue-600 bg-blue-50 rounded">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Video className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Sesión virtual</p>
                  <p className="text-xs text-gray-600">Mañana a las 10:00 AM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border-l-4 border-purple-600 bg-purple-50 rounded">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Taller de estudio</p>
                  <p className="text-xs text-gray-600">20 de mayo</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border-l-4 border-green-600 bg-green-50 rounded">
                <div className="bg-green-600 p-2 rounded-lg">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Entrega de reporte</p>
                  <p className="text-xs text-gray-600">25 de mayo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Important Actions */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Acciones importantes</h3>
              <button className="text-blue-600 text-sm hover:underline">Ver todas</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Mejorar promedio de química</p>
                  <p className="text-xs text-gray-500 mt-1">Pendiente</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Revisar material de estudio</p>
                  <p className="text-xs text-gray-500 mt-1">En progreso</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Completar cuestionario de satisfacción</p>
                  <p className="text-xs text-gray-500 mt-1">Pendiente</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Asistir a tutorías semanales</p>
                  <p className="text-xs text-gray-500 mt-1">En progreso</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
