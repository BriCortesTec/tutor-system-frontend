import { AlertTriangle, TrendingDown, Clock } from 'lucide-react';

export function RecentAlerts() {
  const alerts = [
    {
      icon: TrendingDown,
      text: '3 estudiantes con bajo promedio en última evaluación',
      color: 'text-red-600 bg-red-50'
    },
    {
      icon: AlertTriangle,
      text: '5 estudiantes en riesgo alto',
      color: 'text-orange-600 bg-orange-50'
    },
    {
      icon: Clock,
      text: '12 reportes pendientes de revisar',
      color: 'text-yellow-600 bg-yellow-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Alertas recientes</h3>
        <button className="text-blue-600 text-sm hover:underline">Ver todas</button>
      </div>
      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
              <div className={`${alert.color} p-2 rounded-lg`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-sm text-gray-700 flex-1">{alert.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
