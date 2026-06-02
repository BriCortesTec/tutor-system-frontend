import { Download, Mail } from 'lucide-react';

export function ReportDetailsTable({ reportes }: any) {
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Detalle de reportes</h3>

      <div className="overflow-x-auto mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm text-gray-600">estudiante</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">tutor</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">fecha</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">estatus</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">motivo</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte: any) => (
              <tr key={reporte.id_reporte} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{reporte.estudiante}</td>
                <td className="py-3 px-4 text-sm">{reporte.tutor}</td>
                <td className="py-3 px-4 text-sm">{reporte.fecha}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    reporte.estatus === 'Completado'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {reporte.estatus}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{reporte.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          <Download className="w-4 h-4" />
          Exportar reporte
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50">
          <Mail className="w-4 h-4" />
          Enviar por correo
        </button>
      </div>
    </div>
  );
}
