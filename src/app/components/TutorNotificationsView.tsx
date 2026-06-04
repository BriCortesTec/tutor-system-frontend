import { useEffect, useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Calendar, Users, FileText, MessageSquare, Clock, Info } from 'lucide-react';

interface Notification {
  id: number;
  idSesion?: string,
  type: 'success' | 'warning' | 'info' | 'alert';
  title: string;
  message: string;
  date: string;
  time: string;
  isImportant: boolean;
  read: boolean;
}
interface AvisoAPI {
  id_aviso: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  prioridad: string;
  fecha: string;
  leido: boolean | string;
  id_sesion: string;
}


export function TutorNotificationsView() {
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {


  const cargarAvisos = async () => {

    try {

      const idTutor =
        localStorage.getItem("idTutor");

        console.log("ID TUTOR:", idTutor);

      const response = await fetch(
        
        `http://127.0.0.1/tutores-api/obtener_avisos_tutor.php?id_tutor=${idTutor}`
      );

      const data: AvisoAPI[] = await response.json();
      console.log(data);
const avisosConvertidos: Notification[] =

  data.map((aviso) => {

    console.log(
      "ID SESION RECIBIDO:",
      aviso.id_sesion
    );

    return {

      id: Number(aviso.id_aviso),

      title: aviso.titulo,

      message: aviso.descripcion,

      idSesion: aviso.id_sesion,

      date: new Date(aviso.fecha)
        .toLocaleDateString(),

      time: new Date(aviso.fecha)
        .toLocaleTimeString(),

      read:
        aviso.leido === true ||
        aviso.leido === "t",

      isImportant:
        aviso.prioridad === "Alta" ||
        aviso.prioridad === "Importante",

      type:
        aviso.prioridad === "Alta"
          ? "alert"
          : "info"

    };

  });
          console.log(
            "AVISOS:",
            avisosConvertidos
          );
        setNotifications(
          avisosConvertidos
        );

      } catch(error) {

        console.error(error);

      }

    };


    cargarAvisos();

  }, []);
  


  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return Clock;
      case 'alert':
        return AlertCircle;
      case 'info':
        return Info;
      default:
        return Bell;
    }
  };
  

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-green-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-500 text-yellow-700';
      case 'alert':
        return 'bg-red-50 border-red-500 text-red-700';
      case 'info':
        return 'bg-blue-50 border-blue-500 text-blue-700';
      default:
        return 'bg-gray-50 border-gray-500 text-gray-700';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'alert':
        return 'text-red-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const unreadCount =
    notifications.filter(
      n => !n.read
    ).length;

  const importantCount =
    notifications.filter(
      n => n.isImportant
  ).length;
  console.log(notifications);
  
  const marcarComoLeida = async (
    
    idAviso: number
  ) => {
    
    try {
      

      const formData = new FormData();

      formData.append(
        "id_aviso",
        idAviso.toString()
      );
      
      await fetch(
        
        "http://127.0.0.1/tutores-api/marcar_aviso_leido.php",
        {
          
          method: "POST",
          body: formData
        }
        
      )
      ;

      setNotifications(prev =>
        prev.map(n =>
          n.id === idAviso
            ? { ...n, read: true }
            : n
        )
      );

    } catch(error) {

      console.error(error);

    }

  };

const aceptarSesion = async (
  idSesion:string,
  idAviso:number
) => {

  console.log("ID SESION:", idSesion);

  const formData = new FormData();

  formData.append(
    "id_sesion",
    idSesion
  );

  const response = await fetch(
    "http://127.0.0.1/tutores-api/aceptar_sesion.php",
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  console.log("ACEPTAR:", data);

if(data.success){

  setNotifications(prev =>
    prev.filter(
      n => n.id !== idAviso
    )
  );

}

};

const rechazarSesion = async (
  idSesion:string,
  idAviso:number
) => {

  const formData = new FormData();

  formData.append(
    "id_sesion",
    idSesion
  );

  const response = await fetch(
    "http://127.0.0.1/tutores-api/eliminar_sesion.php",
    {
      method:"POST",
      body:formData
    }
  );

  const data = await response.json();

  console.log("RECHAZAR:", data);

if(data.success){

  setNotifications(prev =>
    prev.filter(
      n => n.id !== idAviso
    )
  );

}

};
const marcarTodasLeidas = async () => {

  for(const aviso of notifications){

    if(!aviso.read){

      const formData = new FormData();

      formData.append(
        "id_aviso",
        aviso.id.toString()
      );

      await fetch(
        "http://127.0.0.1/tutores-api/marcar_aviso_leido.php",
        {
          method:"POST",
          body:formData
        }
      );

    }

  }

  setNotifications(prev =>
    prev.map(n => ({
      ...n,
      read:true
    }))
  );

};
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Centro de notificaciones</h2>
          <p className="text-sm text-gray-600">Mantente al día con tus actividades</p>
        </div>
<button
  onClick={marcarTodasLeidas}
  className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
>
  Marcar todas como leídas
</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de avisos</p>
              <p className="font-semibold">{notifications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">No leídos</p>
              <p className="font-semibold">{unreadCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Importantes</p>
              <p className="font-semibold">{importantCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold">Avisos recientes</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const colorClass = getNotificationColor(notification.type);
            const iconColorClass = getIconColor(notification.type);

            return (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className={`${colorClass} p-3 rounded-lg h-fit border-l-4`}>
                    <Icon className={`w-5 h-5 ${iconColorClass}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {notification.isImportant && (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            Importante
                          </span>
                        )}
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{notification.date}</p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{notification.message}</p>
                    {notification.title ===
                      "Nueva solicitud de tutoría" &&
                      !notification.read && (

                      <div className="flex gap-2 mt-3">

                      <button
                        onClick={() => {

                          console.log("CLICK ACEPTAR");

                          notification.idSesion &&
                          aceptarSesion(
                            notification.idSesion,
                            notification.id
                          );

                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Aceptar
                      </button>

                      <button
                        onClick={() => {

                          console.log("CLICK RECHAZAR");

                          notification.idSesion &&
                          rechazarSesion(
                            notification.idSesion,
                            notification.id
                          );

                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Rechazar
                      </button>

                      </div>

                    )}

                    <div className="flex gap-2">
                      {!notification.read && (
                        <button
                          onClick={() =>
                            marcarComoLeida(notification.id)
                          }
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Marcar como leída
                        </button>
                      )}
                    
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State (commented for reference) */}
      {/* {notifications.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold mb-2">No tienes notificaciones</h3>
          <p className="text-gray-600">Cuando recibas avisos, aparecerán aquí</p>
        </div>
      )} */}
    </div>
  );
}
