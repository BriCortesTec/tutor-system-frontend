import { UserPlus, MessageSquare, BarChart3, Mail } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { icon: UserPlus, label: 'Agregar estudiante', color: 'bg-blue-50 text-blue-600' },
    { icon: MessageSquare, label: 'Enviar mensaje', color: 'bg-green-50 text-green-600' },
    { icon: BarChart3, label: 'Ver estadísticas', color: 'bg-purple-50 text-purple-600' },
    { icon: Mail, label: 'Notificaciones', color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Acciones rápidas</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`${action.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm text-center">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
