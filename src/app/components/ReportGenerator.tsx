import { Search, Download, Mail } from 'lucide-react';

export function ReportGenerator() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-6">1. Selecciona los filtros del reporte</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Tutor</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Nivel</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option>Todos</option>
            <option>1er Semestre</option>
            <option>2do Semestre</option>
            <option>3er Semestre</option>
            <option>4to Semestre</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Tutorados</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option>Selecciona</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Estatus de tutoría</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option>Todos</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Periodo académico</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option>2025-2026</option>
            <option>2024-2025</option>
            <option>2023-2024</option>
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
        Generar reporte
      </button>
    </div>
  );
}
