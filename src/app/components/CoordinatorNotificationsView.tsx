import { Bell, CheckCircle, AlertCircle, Info, AlertTriangle, Search, Filter, Plus, UserPlus, FileText, Mail, BarChart3, Trash2 } from 'lucide-react';
import { useEffect, useState } from "react";

export function CoordinatorNotificationsView() {
  
  const [filtro, setFiltro] = useState("Todas");
  const [selectedAviso, setSelectedAviso] = useState<any>(null);  
  const [notifications, setNotifications] = useState<any[]>([]);

  const [search, setSearch] = useState("");

    useEffect(() => {

      obtenerAvisos();

    }, []);

  const [showModal, setShowModal] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("Normal");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [avisoEliminar, setAvisoEliminar] = useState<any>(null);

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

  

  
  const filteredNotifications = notifications.filter((notification) => {
    const coincideBusqueda =

      notification.titulo.toLowerCase().includes(search.toLowerCase()) ||

      notification.descripcion.toLowerCase().includes(search.toLowerCase());

    const coincideFiltro =

      filtro === "Todas" ||

      notification.prioridad === filtro;

    return coincideBusqueda && coincideFiltro;

  });

  const unreadCount = filteredNotifications.filter(
    (n) => !n.leido || n.leido === "f"
  ).length;
  const totalAvisos = filteredNotifications.length;

  const leidos = filteredNotifications.filter(
    n => n.leido === true || n.leido === "t"
  ).length;

  const importantes = filteredNotifications.filter(
    n => n.prioridad === "Alta"
  ).length;
  const agregarAviso = async () => {

  const formData = new FormData();

  formData.append("titulo", titulo);
  formData.append("descripcion", descripcion);
  formData.append("prioridad", prioridad);

  const response = await fetch(
    "http://127.0.0.1/tutores-api/agregar_aviso.php",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();

  if (data.success) {

    setShowModal(false);

    setTitulo("");
    setDescripcion("");
    setPrioridad("Normal");

    obtenerAvisos();

  }

};
  const eliminarAviso = async (id: string) => {

    const formData = new FormData();

    formData.append("id_aviso", id);

    const response = await fetch(
      "http://127.0.0.1/tutores-api/eliminar_aviso.php",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (data.success) {

      obtenerAvisos();

    }

  };
  const marcarLeido = async (id: string) => {
    const formData = new FormData();

    formData.append("id_aviso", id);

    await fetch(
      "http://127.0.0.1/tutores-api/marcar_leido.php",
      {
        method: "POST",
        body: formData
      }
    );

    obtenerAvisos();

  };


  return (
    <div className="space-y-6">
      {/* Header */}
      

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-4">
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
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold">Lista de avisos</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar aviso"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <select
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-40"
                >
                  
                    
                  <option value="Todas">
                    Todas
                  </option>

                  <option value="Alta">
                    Alta
                  </option>

                  <option value="Media">
                    Media
                  </option>

                  <option value="Normal">
                    Normal
                  </option>

                </select>
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {filteredNotifications.map((notification) => (
              <div
                onClick={() => {

                  setSelectedAviso(notification);

                  marcarLeido(notification.id_aviso);

                }}
                key={notification.id_aviso}
                className={`p-6 border-b border-gray-100 cursor-pointer transition

                ${notification.leido === true || notification.leido === "t"
                    ? "bg-white"
                    : "bg-blue-50"
                  }
                `}
              >

                <div className="flex items-start justify-between gap-4">

  <div className="flex-1">

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

  <div className="flex flex-col items-end gap-3">

    <span
      className={`px-3 py-1 rounded-full text-sm font-medium

      ${notification.prioridad === "Alta"
        ? "bg-red-100 text-red-700"

        : notification.prioridad === "Media"
        ? "bg-yellow-100 text-yellow-700"

        : "bg-green-100 text-green-700"
      }
      `}
    >
      {notification.prioridad}
    </span>

    <button
      onClick={(e) => {

        e.stopPropagation();

        setAvisoEliminar(notification);

        setShowDeleteModal(true);

      }}
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 className="w-4 h-4" />
    </button>

  </div>

</div>

              </div>

            ))}
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-600">Mostrando {filteredNotifications.length} avisos</span>
          </div>
        </div>

        <div className="space-y-6">
            {showModal && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                <div className="bg-white rounded-xl p-6 w-[450px]">

                  <h2 className="text-2xl font-semibold mb-4">
                    Nuevo aviso
                  </h2>

                  <div className="space-y-4">

                    <input
                      type="text"
                      placeholder="Título"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                    />

                    <textarea
                      placeholder="Descripción"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="w-full border rounded-lg px-4 py-2 h-28"
                    />

                    <select
                      value={prioridad}
                      onChange={(e) => setPrioridad(e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                    >

                      <option value="Normal">Normal</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>

                    </select>

                  </div>

                  <div className="flex justify-end gap-3 mt-6">

                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      Cancelar
                    </button>

                    <button
                    onClick={agregarAviso}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Guardar
                    </button>

                  </div>

                </div>

              </div>

            )

          }
          {
  selectedAviso && (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-semibold">
            Detalle del aviso
          </h2>

          <button
            onClick={() => setSelectedAviso(null)}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-4">

          <div>

            <p className="text-sm text-gray-500">
              Título
            </p>

            <h3 className="font-semibold text-lg">
              {selectedAviso.titulo}
            </h3>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Descripción
            </p>

            <p className="text-gray-700">
              {selectedAviso.descripcion}
            </p>

          </div>

          <div className="flex justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Prioridad
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium

                ${selectedAviso.prioridad === "Alta"
                  ? "bg-red-100 text-red-700"

                  : selectedAviso.prioridad === "Media"
                  ? "bg-yellow-100 text-yellow-700"

                  : "bg-green-100 text-green-700"
                }
                `}
              >
                {selectedAviso.prioridad}
              </span>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Fecha
              </p>

              <p>
                {new Date(selectedAviso.fecha).toLocaleString("es-MX")}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )


}
{
  showDeleteModal && (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-[400px]">

        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Eliminar aviso
        </h2>

        <p className="text-gray-700">
          ¿Seguro que deseas eliminar este aviso?
        </p>

        <p className="font-semibold mt-3">
          {avisoEliminar?.titulo}
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={() => {

              eliminarAviso(avisoEliminar.id_aviso);

              setShowDeleteModal(false);

            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Eliminar
          </button>

        </div>

      </div>

    </div>

  )
}
        </div>
      </div>
    </div>
  );
}
