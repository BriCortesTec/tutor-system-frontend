import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';


import { RiskChart } from './components/RiskChart';
import { TutorshipChart } from './components/TutorshipChart';
import { ReportsView } from './components/ReportsView';
import { StudentApp } from './components/StudentApp';
import { TutorApp } from './components/TutorApp';
import { TutorsManagementView } from './components/TutorsManagementView';
import { StudentsManagementView } from './components/StudentsManagementView';
import { AssignmentsView } from './components/AssignmentsView';
import { CoordinatorNotificationsView } from './components/CoordinatorNotificationsView';
import { Users, UserCheck, FileText, AlertTriangle, Bell, LogOut, ArrowLeft } from 'lucide-react';
import Login from './components/Login';

export default function App() {
  const [logueado, setLogueado] = useState(
    localStorage.getItem("logueado") === "true"
  );

  const rolGuardado = localStorage.getItem("rol");

  const [userRole, setUserRole] = useState<
    'coordinator' | 'student' | 'tutor'
  >(
    rolGuardado === "Tutor"
      ? "tutor"
      : rolGuardado === "Estudiante"
      ? "student"
      : "coordinator"
  );

  const [activeSection, setActiveSection] = useState('inicio');
  const [dashboard, setDashboard] = useState<any>(null);
  
  useEffect(() => {
    
  fetch("http://127.0.0.1/tutores-api/dashboard_coordinadora.php")
    .then((response) => response.json())
    .then((data) => {

      console.log(data);

      setDashboard(data);

    });
    

}, []);
  if (!logueado) {
    return <Login />;
  }
  if (userRole === 'student') {
    return (
      <div>
        <StudentApp />
      </div>
    );
  }

  if (userRole === 'tutor') {
    return (
      <div>
        <TutorApp />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar

  activeSection={activeSection}

  onSectionChange={setActiveSection}

  setLogueado={setLogueado}

/>

      <main className="flex-1 overflow-auto">

        {activeSection === 'inicio' && (

          <header className="bg-white shadow-sm sticky top-0 z-10">

      <div className="px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-semibold">¡Bienvenida, Coordinadora!</h2>
                <p className="text-sm text-gray-500">Gestiona tu programa de tutorados</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                
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
          )}

  <div className="p"></div>

        {/* Dashboard Content */}
        <div className="p-8">
          {activeSection === 'inicio' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total estudiantes"
                  value={dashboard?.totalEstudiantes || 0}
                  icon={Users}
                  bgColor="bg-blue-50"
                  iconColor="text-blue-600"
                />
                <StatCard
                  title="Tutores activos"
                  value={dashboard?.tutoresActivos || 0}
                  icon={UserCheck}
                  bgColor="bg-green-50"
                  iconColor="text-green-600"
                />
                <StatCard
                  title="Reportes realizados"
                  value={dashboard?.reportes || 0}
                  icon={FileText}
                  bgColor="bg-orange-50"
                  iconColor="text-orange-600"
                />
                <StatCard
                  title="Estudiantes en riesgo"
                  value={dashboard?.riesgo || 0}
                  icon={AlertTriangle}
                  bgColor="bg-red-50"
                  iconColor="text-red-600"
                />
              </div>

          

              {/* Charts and Alerts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-1">
                  <RiskChart dashboard={dashboard} />
                </div>
                <div className="lg:col-span-2">
                  <TutorshipChart dashboard={dashboard} /> 
                </div>
              </div>

              {/* Recent Alerts */}
              <div>
              </div>
            </>
          )}

          {activeSection === 'reportes' && (
            <>
              <div className="mb-6">
                <h2 className="font-semibold mb-2">Generador de Reportes</h2>
      
              </div>
              <ReportsView />
            </>
          )}

          {activeSection === 'tutores' && <TutorsManagementView />}
          {activeSection === 'avisos' && <CoordinatorNotificationsView />}

          {activeSection !== 'inicio' &&
           activeSection !== 'reportes' &&
           activeSection !== 'tutores' &&
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
