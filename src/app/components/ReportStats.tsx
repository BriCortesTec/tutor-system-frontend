import { Users, FileCheck, TrendingUp, AlertCircle, Target } from 'lucide-react';

export function ReportStats() {
  const stats = [
    {
      icon: Users,
      label: 'Total de estudiantes en el programa',
      value: '523',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'Estudiantes con progreso positivo',
      value: '433',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: AlertCircle,
      label: 'Estudiantes en riesgo académico',
      value: '29',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div>
      <h3 className="font-semibold mb-4"> Reportes visuales</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className={`${stat.bgColor} p-3 rounded-lg w-fit mb-3`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
