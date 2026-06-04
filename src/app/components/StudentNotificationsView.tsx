import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar
} from "lucide-react";

interface AvisoAlumno {
  id_aviso: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  prioridad: string;
  fecha: string;
  leido: boolean | string;
  id_sesion: string;
}

interface Notification {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  date: string;
  time: string;
  read: boolean;
}

export function StudentNotificationsView() {

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  useEffect(() => {

    const cargarAvisos = async () => {

      try {

        const idAlumno =
          localStorage.getItem("idAlumno");

        const response = await fetch(
          `http://127.0.0.1/tutores-api/obtener_avisos_alumno.php?id_alumno=${idAlumno}`
        );

        const data: AvisoAlumno[] =
          await response.json();

        const avisosConvertidos =
          data.map((aviso) => ({

            id: Number(aviso.id_aviso),

            title: aviso.titulo,

            description: aviso.descripcion,

            category: aviso.categoria,

            priority: aviso.prioridad,

            date: new Date(aviso.fecha)
              .toLocaleDateString(),

            time: new Date(aviso.fecha)
              .toLocaleTimeString(),

            read:
              aviso.leido === true ||
              aviso.leido === "t"

          }));

        setNotifications(
          avisosConvertidos
        );

      } catch(error) {

        console.error(error);

      }

    };

    cargarAvisos();

  }, []);

  const getPriorityColor = (
    priority: string
  ) => {

    switch(priority){

      case "Alta":
        return "bg-red-100 text-red-700";

      case "Media":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };

  const unreadCount =
    notifications.filter(
      n => !n.read
    ).length;

  return (
    <div className="space-y-6">

      <div>
        <h2 className="font-semibold mb-1">
          Avisos
        </h2>

        <p className="text-sm text-gray-600">
          Mantente informado sobre tus actividades académicas
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">

        <div className="p-6 border-b border-gray-200 flex justify-between">

          <h3 className="font-semibold">
            Lista de avisos
          </h3>

      

        </div>

        <div className="divide-y divide-gray-100">

          {notifications.map((notification) => (

            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 ${
                !notification.read
                  ? "bg-blue-50/30"
                  : ""
              }`}
            >

              <div className="flex gap-4">

                <div className="bg-blue-50 p-3 rounded-lg">

                  <Calendar className="w-5 h-5 text-blue-600" />

                </div>

                <div className="flex-1">

                  <div className="flex items-center gap-2 mb-2">

                    <h4 className="font-semibold text-sm">

                      {notification.title}

                    </h4>

                    {!notification.read && (

                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>

                    )}

                  </div>

                  <p className="text-sm text-gray-600 mb-2">

                    {notification.description}

                  </p>

                  <div className="flex justify-between items-center">

                    <div className="flex gap-2">

                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">

                        {notification.category}

                      </span>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                          notification.priority
                        )}`}
                      >

                        {notification.priority}

                      </span>

                    </div>

                    <div className="text-xs text-gray-500">

                      {notification.date}
                      {" "}
                      {notification.time}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

          {notifications.length === 0 && (

            <div className="p-8 text-center text-gray-500">

              No tienes avisos.

            </div>

          )}

        </div>

      </div>

    </div>
  );

}