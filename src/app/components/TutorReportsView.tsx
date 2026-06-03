import { useEffect, useState } from 'react';
import { Users, CheckCircle, AlertTriangle, Download, FileText, TrendingUp, Loader2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const API_BASE = 'http://127.0.0.1/tutores-api';

interface Reporte {
  id_reporte: string;
  estudiante: string;
  tutor: string;
  fecha: string;
  estatus: string;
  motivo: string;
}

export function TutorReportsView() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [cargando, setCargando] = useState(true);
  const [exportando, setExportando] = useState<string | null>(null);
  const [error, setError] = useState('');

  const performanceData = [
    { mes: 'Ene', promedio: 8.2 },
    { mes: 'Feb', promedio: 8.5 },
    { mes: 'Mar', promedio: 8.3 },
    { mes: 'Abr', promedio: 8.7 },
    { mes: 'May', promedio: 8.9 }
  ];

  const progressData = [
    { estudiante: 'Ana Laura', inicial: 7.2, actual: 7.8 },
    { estudiante: 'Carlos', inicial: 8.0, actual: 8.5 },
    { estudiante: 'María', inicial: 8.3, actual: 8.7 },
    { estudiante: 'Roberto', inicial: 9.0, actual: 9.3 },
    { estudiante: 'Laura', inicial: 8.8, actual: 9.1 }
  ];

  // ─── Cargar reportes desde la API ───────────────────────────────────────────
  useEffect(() => {
    const cargarReportes = async () => {
      try {
        const res = await fetch(`${API_BASE}/obtener_reportes.php`);
        const data: Reporte[] = await res.json();
        setReportes(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la lista de reportes.');
      } finally {
        setCargando(false);
      }
    };
    cargarReportes();
  }, []);

  // ─── Exportar un reporte individual como PDF ────────────────────────────────
  const exportarPDF = (idReporte: string) => {
    setExportando(idReporte);
    // El endpoint genera el PDF y redirige al archivo; lo abrimos en nueva pestaña
    window.open(`${API_BASE}/exportar_reporte.php?id=${idReporte}`, '_blank');
    // Pequeño delay para quitar el spinner (la apertura es inmediata)
    setTimeout(() => setExportando(null), 1500);
  };

  // ─── Exportar TODOS los reportes (abre cada uno con 300 ms de diferencia) ──
  const exportarTodos = () => {
    if (reportes.length === 0) return;
    reportes.forEach((r, i) => {
      setTimeout(() => {
        window.open(`${API_BASE}/exportar_reporte.php?id=${r.id_reporte}`, '_blank');
      }, i * 300);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado': return 'bg-green-100 text-green-700';
      case 'Pendiente':  return 'bg-yellow-100 text-yellow-700';
      default:           return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Reportes y análisis</h2>
          <p className="text-sm text-gray-600">Dashboard analítico de desempeño</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportarTodos}
            disabled={cargando || reportes.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-4 h-4" />
            Generar reporte
          </button>
          <button
            onClick={exportarTodos}
            disabled={cargando || reportes.length === 0}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-blue-100 text-sm mb-1">Total de reportes</p>
          <p className="font-semibold mb-2">{cargando ? '...' : `${reportes.length} reportes`}</p>
          <p className="text-xs text-blue-100">
            {reportes.filter(r => r.estatus === 'Completado').length} completados
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-green-100 text-sm mb-1">Estudiantes atendidos</p>
          <p className="font-semibold mb-2">
            {cargando ? '...' : `${new Set(reportes.map(r => r.estudiante)).size} estudiantes`}
          </p>
          <p className="text-xs text-green-100">100% de asistencia</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Atención</span>
          </div>
          <p className="text-orange-100 text-sm mb-1">Reportes pendientes</p>
          <p className="font-semibold mb-2">
            {cargando ? '...' : `${reportes.filter(r => r.estatus === 'Pendiente').length} pendientes`}
          </p>
          <p className="text-xs text-orange-100">Requieren seguimiento</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Rendimiento académico promedio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis domain={[7, 10]} stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="promedio"
                name="Promedio"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Progreso de estudiantes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="estudiante" stroke="#6b7280" />
              <YAxis domain={[6, 10]} stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="inicial" name="Inicial" fill="#94a3b8" />
              <Bar dataKey="actual" name="Actual" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de Reportes desde la BD */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold">Reportes registrados</h3>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {cargando ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Cargando reportes...</span>
          </div>
        ) : reportes.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No hay reportes registrados aún.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estudiante</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tutor</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Fecha</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Motivo</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estatus</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Reporte</th>
                </tr>
              </thead>
              <tbody>
                {reportes.map((reporte) => (
                  <tr key={reporte.id_reporte} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                          {reporte.estudiante
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <span className="font-medium text-sm">{reporte.estudiante}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">{reporte.tutor}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{reporte.fecha}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 max-w-[200px] truncate" title={reporte.motivo}>
                      {reporte.motivo}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(reporte.estatus)}`}>
                        {reporte.estatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => exportarPDF(reporte.id_reporte)}
                        disabled={exportando === reporte.id_reporte}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      >
                        {exportando === reporte.id_reporte ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 mb-1">Promedio general</p>
          <p className="font-semibold">8.66</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-600 mb-1">Tasa de aprobación</p>
          <p className="font-semibold">94%</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
          <p className="text-sm text-gray-600 mb-1">Horas de tutoría</p>
          <p className="font-semibold">42h</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-orange-500">
          <p className="text-sm text-gray-600 mb-1">Satisfacción</p>
          <p className="font-semibold">4.8/5.0</p>
        </div>
      </div>
    </div>
  );
}
