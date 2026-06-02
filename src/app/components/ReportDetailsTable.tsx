import { Download, Mail } from 'lucide-react';

export function ReportDetailsTable({ reportes }: any) {

  // =========================
  // COMPLETAR REPORTE
  // =========================

  const completarReporte = async (id: number) => {

    await fetch(

      "http://127.0.0.1/tutores-api/completar_reporte.php",

      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          id_reporte: id
        })

      }

    );

  };

  // =========================
  // EXPORTAR PDF
  // =========================

  const exportarReporte = async (reporte: any) => {

    // marcar como completado

    await completarReporte(reporte.id_reporte);

    // TEMPORAL
    // aquí después irá el PDF real

    alert(
      `Exportando reporte de ${reporte.estudiante}`
    );

    window.location.reload();

  };

  // =========================
  // ENVIAR CORREO
  // =========================

  const enviarCorreo = async (reporte: any) => {

    // marcar como completado

    await completarReporte(reporte.id_reporte);

    // TEMPORAL
    // aquí después irá PHPMailer

    alert(
      `Enviando correo de ${reporte.estudiante}`
    );

    window.location.reload();

  };

  return (

    <div className="bg-white rounded-xl p-5 shadow-sm">

      <h3 className="font-semibold text-xl mb-5">
        Detalle de reportes
      </h3>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b border-gray-200 text-gray-600">

              <th className="text-left py-3 px-3">
                Estudiante
              </th>

              <th className="text-left py-3 px-3">
                Tutor
              </th>

              <th className="text-left py-3 px-3">
                Fecha
              </th>

              <th className="text-left py-3 px-3">
                Estatus
              </th>

              <th className="text-left py-3 px-3">
                Motivo
              </th>

              <th className="text-left py-3 px-3">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {reportes.map((reporte: any) => (

              <tr
                key={reporte.id_reporte}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >

                {/* ESTUDIANTE */}

                <td className="py-4 px-3 text-xs md:text-sm font-medium text-gray-800">

                  {reporte.estudiante}

                </td>

                {/* TUTOR */}

                <td className="py-4 px-3 text-xs md:text-sm text-gray-700">

                  {reporte.tutor}

                </td>

                {/* FECHA */}

                <td className="py-4 px-3 text-xs md:text-sm text-gray-600 whitespace-nowrap">

                  {reporte.fecha}

                </td>

                {/* ESTATUS */}

                <td className="py-4 px-3">

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      reporte.estatus === "Completado"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {reporte.estatus}

                  </span>

                </td>

                {/* MOTIVO */}

                <td className="py-4 px-3 text-xs md:text-sm text-gray-600">

                  {reporte.motivo}

                </td>

                {/* ACCIONES */}

                <td className="py-4 px-3">

                  <div className="flex flex-col md:flex-row gap-2">

                    {/* EXPORTAR */}

                    <button

                      onClick={() => exportarReporte(reporte)}

                      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-xs md:text-sm"

                    >

                      <Download className="w-4 h-4" />

                      Exportar

                    </button>

                    {/* CORREO */}

                    <button

                      onClick={() => enviarCorreo(reporte)}

                      className="flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition text-xs md:text-sm"

                    >

                      <Mail className="w-4 h-4" />

                      Correo

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}