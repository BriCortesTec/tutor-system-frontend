import { Search } from 'lucide-react';

export function ReportGenerator({

  busquedaTutor,

  setBusquedaTutor,

  estatusFiltro,

  setEstatusFiltro

}: any) {

  return (

    <div className="bg-white rounded-lg p-6 shadow-sm">

      <h3 className="font-semibold text-xl mb-6">
        Selecciona los filtros del reporte
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

        {/* BUSCADOR */}

        <div>

          <label className="text-sm text-gray-600 mb-2 block">
            Tutor o estudiante
          </label>

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

        {/* ESTATUS */}

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

        {/* BOTÓN */}

        <button
          className="bg-blue-600 text-white py-2.5 px-6 rounded-lg hover:bg-blue-700 transition font-medium"
        >

          Buscar reporte

        </button>

      </div>

    </div>

  );

}