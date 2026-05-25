import { Download, Mail } from 'lucide-react';

export function ReportDetailsTable() {
  const reports = [
    {
      id: 1,
      student: 'Juan Pérez García',
      tutor: 'María González',
      date: '15/03/2026',
      status: 'Completado',
      reason: 'Bajo rendimiento'
    },
    {
      id: 2,
      student: 'Ana López Martínez',
      tutor: 'Carlos Ramírez',
      date: '14/03/2026',
      status: 'Completado',
      reason: 'Ansiedad/Estrés'
    },
    {
      id: 3,
      student: 'Pedro Sánchez Ruiz',
      tutor: 'Elena Torres',
      date: '13/03/2026',
      status: 'Pendiente',
      reason: 'Problemas familiares'
    },
    {
      id: 4,
      student: 'Laura Hernández Cruz',
      tutor: 'Luis Fernández',
      date: '12/03/2026',
      status: 'Completado',
      reason: 'Bajo rendimiento'
    },
    {
      id: 5,
      student: 'Miguel Ángel Torres',
      tutor: 'Ana Martínez',
      date: '11/03/2026',
      status: 'Completado',
      reason: 'Otros'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Detalle de reportes</h3>

      <div className="overflow-x-auto mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm text-gray-600">Estudiante</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">Tutor</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">Fecha</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">Estatus</th>
              <th className="text-left py-3 px-4 text-sm text-gray-600">Motivo</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{report.student}</td>
                <td className="py-3 px-4 text-sm">{report.tutor}</td>
                <td className="py-3 px-4 text-sm">{report.date}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    report.status === 'Completado'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{report.reason}</td>
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
