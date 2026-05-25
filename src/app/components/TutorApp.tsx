import { useState } from 'react';
import { TutorSidebar } from './TutorSidebar';
import { TutorView } from './TutorView';
import { MyStudentsView } from './MyStudentsView';
import { ScheduleView } from './ScheduleView';
import { CompletedSessionsView } from './CompletedSessionsView';
import { TutorReportsView } from './TutorReportsView';
import { TutorNotificationsView } from './TutorNotificationsView';
import { MessagesView } from './MessagesView';
import { Bell, LogOut, MessageSquare } from 'lucide-react';

export function TutorApp() {
  const [activeSection, setActiveSection] = useState('inicio');

  return (
    <div className="flex h-screen bg-gray-50">
      <TutorSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">¡Bienvenido, Mtro. Javier López!</h2>
              <p className="text-sm text-gray-500">Gestiona tus estudiantes y tutorías</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt="Javier López"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">Javier López</span>
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
          {activeSection === 'inicio' && <TutorView />}
          {activeSection === 'mis-estudiantes' && <MyStudentsView />}
          {activeSection === 'horarios' && <ScheduleView />}
          {activeSection === 'sesiones-realizadas' && <CompletedSessionsView />}
          {activeSection === 'reportes' && <TutorReportsView />}
          {activeSection === 'mensajes' && <MessagesView />}
          {activeSection === 'avisos' && <TutorNotificationsView />}

          {activeSection !== 'inicio' &&
           activeSection !== 'mis-estudiantes' &&
           activeSection !== 'horarios' &&
           activeSection !== 'sesiones-realizadas' &&
           activeSection !== 'reportes' &&
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
