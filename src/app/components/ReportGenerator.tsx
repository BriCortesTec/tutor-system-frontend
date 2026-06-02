import { Search, Download, Mail } from 'lucide-react';

export function ReportGenerator({

  busquedaTutor,

  setBusquedaTutor,

  estatusFiltro,

  setEstatusFiltro

}: any) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-6">   Selecciona los filtros del reporte</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Tutor</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={busquedaTutor}

              onChange={(e) => setBusquedaTutor(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
          </div>
        </div>

        <div>

  <label className="text-sm text-gray-600 mb-2 block">
    Estatus de tutoría
  </label>

  <select

    value={estatusFiltro}

    onChange={(e) => setEstatusFiltro(e.target.value)}

    className="w-full border border-gray-300 rounded-lg px-3 py-2"
  >

    <option>Todos</option>

    <option>Completado</option>

    <option>Pendiente</option>

  </select>

</div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Acciones</label>
          <div className="flex gap-2">
            <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              Limpiar
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              Filtrar
            </button>
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
        Buscar reporte
      </button>
    </div>
  );
}
