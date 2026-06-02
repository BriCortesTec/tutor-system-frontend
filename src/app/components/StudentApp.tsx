import { useState } from 'react';
import { StudentSidebar } from './StudentSidebar';
import { StudentView } from './StudentView';
import { StudentMessagesView } from './StudentMessagesView';
import { StudentAgendaView } from './StudentAgendaView';
import { StudentTutoriasView } from './StudentTutoriasView';
import { StudentNotificationsView } from './StudentNotificationsView';
import { Bell, LogOut, MessageSquare } from 'lucide-react';

export function StudentApp() {
  const [activeSection, setActiveSection] = useState('inicio');

  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">¡Hola, Ana Laura! 👋</h2>
              <p className="text-sm text-gray-500">Último acceso el 18 de enero</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Ana Laura"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">Ana Laura</span>
              </div>
              <button
                onClick={() => {

                  localStorage.removeItem("logueado");
                  localStorage.removeItem("rol");

                  window.location.reload();

                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Salir</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeSection === 'inicio' && <StudentView />}
          {activeSection === 'mi-agenda' && <StudentAgendaView />}
          {activeSection === 'mis-tutorias' && <StudentTutoriasView />}
          {activeSection === 'mensajes' && <StudentMessagesView />}
          {activeSection === 'avisos' && <StudentNotificationsView />}

          {activeSection !== 'inicio' &&
           activeSection !== 'mi-agenda' &&
           activeSection !== 'mis-tutorias' &&
           activeSection !== 'mensajes' &&
           activeSection !== 'avisos' && (
            <div className="bg-white rounded-lg p-12 text-center shadow-sm">
              <h3 className="font-semibold mb-2">Sección en desarrollo</h3>
              <p className="text-gray-600">Esta sección estará disponible próximamente</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
