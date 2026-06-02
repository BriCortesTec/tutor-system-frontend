import { Bell, CheckCircle, AlertCircle, Info, AlertTriangle, Search, Filter, Plus, UserPlus, FileText, Mail, BarChart3 } from 'lucide-react';
import { useEffect, useState } from "react";

export function CoordinatorNotificationsView() {
  
  const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {

      obtenerAvisos();

    }, []);

  const obtenerAvisos = async () => {
    
  const response = await fetch(
    "http://127.0.0.1/tutores-api/obtener_avisos.php"
  );

  const data = await response.json();
  console.log(data);
  setNotifications(data);

};

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-100 text-red-700';
      case 'Media':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const totalAvisos = notifications.length;

  const leidos = notifications.filter(
    n => n.leido === true || n.leido === "t"
  ).length;

  const importantes = notifications.filter(
    n => n.prioridad === "Alta"
  ).length;
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Avisos</h2>
          <p className="text-sm text-gray-600">Centro de notificaciones del sistema</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Nuevo aviso
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total avisos</p>
              <p className="font-semibold">{totalAvisos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Leídos</p>
              <p className="font-semibold">{leidos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">No leídos</p>
              <p className="font-semibold">{unreadCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Alertas importantes</p>
              <p className="font-semibold">{importantes}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold">Lista de avisos</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar aviso..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filtros
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id_aviso}
                className="p-6 border-b border-gray-100"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      {notification.titulo}
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {notification.descripcion}
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(notification.fecha).toLocaleString("es-MX", {
  dateStyle: "short",
  timeStyle: "short"
})}
                    </p>

                  </div>

                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                    {notification.prioridad}
                  </span>

                </div>

              </div>

            ))}
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-600">Mostrando {notifications.length} avisos</span>
          </div>
        </div>

        {/* Right Panel - Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Acciones rápidas</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Crear aviso</p>
                  <p className="text-xs text-gray-600">Nueva notificación</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="bg-green-600 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Marcar todas como leídas</p>
                  <p className="text-xs text-gray-600">Limpiar pendientes</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Ver estadísticas</p>
                  <p className="text-xs text-gray-600">Análisis de avisos</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="bg-orange-600 p-2 rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Enviar notificación masiva</p>
                  <p className="text-xs text-gray-600">A todos los usuarios</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
