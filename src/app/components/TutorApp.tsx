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
  const nombreTutor =
  localStorage.getItem("nombreTutor");

  return (
    <div className="flex h-screen bg-gray-50">
      <TutorSidebar activeSection={activeSection} onSectionChange={setActiveSection} nombreTutor={nombreTutor || ""} />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        {activeSection === "inicio" && (

          <header className="bg-white shadow-sm sticky top-0 z-10">

            <div className="px-8 py-4 flex justify-between items-center">

              <div>

                <h2 className="font-semibold">
                  ¡Bienvenido {nombreTutor?.toUpperCase()}!
                </h2>

                <p className="text-sm text-gray-500">
                  Gestiona tus estudiantes y tutorías
                </p>

              </div>

            </div>

          </header>

          )}

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
