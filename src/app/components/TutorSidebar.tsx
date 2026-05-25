import { Home, Users, Calendar, FileText, MessageSquare, BookOpen, Bell } from 'lucide-react';

interface TutorSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function TutorSidebar({ activeSection, onSectionChange }: TutorSidebarProps) {
  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'mis-estudiantes', label: 'Mis estudiantes', icon: Users },
    { id: 'horarios', label: 'Horarios', icon: Calendar },
    { id: 'sesiones-realizadas', label: 'Sesiones realizadas', icon: BookOpen },
    { id: 'reportes', label: 'Reportes', icon: FileText },
    { id: 'mensajes', label: 'Mensajes', icon: MessageSquare },
    { id: 'avisos', label: 'Avisos', icon: Bell },
  ];

  return (
    <aside className="w-64 bg-[#1e3a5f] text-white h-screen flex flex-col">
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-[#1e3a5f]" />
          </div>
          <div>
            <h1 className="font-semibold">Sistema de</h1>
            <h1 className="font-semibold">Tutorados</h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-800 border-l-4 border-white'
                  : 'hover:bg-blue-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-blue-800">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            alt="Javier López"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium">Mtro. Javier López</p>
            <p className="text-blue-300 text-xs">Tutor</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
