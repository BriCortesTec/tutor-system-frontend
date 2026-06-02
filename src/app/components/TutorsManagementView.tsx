import { Users, CheckCircle, Clock, Star, AlertTriangle, Search, Filter, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function TutorsManagementView() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [editando, setEditando] = useState(false);
  const [idTutorEditar, setIdTutorEditar] = useState("");
  const [idUsuarioEditar, setIdUsuarioEditar] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [tutorEliminar, setTutorEliminar] = useState<any>(null);
  
  const agregarTutor = async () => {
  const formData = new FormData();

  formData.append("nombre", nombre);
  formData.append("correo", correo);
  formData.append("password", password);
  formData.append("departamento", departamento);

  

  const response = await fetch(
    "http://127.0.0.1/tutores-api/agregar_tutor.php",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();

  if (data.success) {

    alert("Tutor agregado correctamente");

    setShowModal(false);

    window.location.reload();

  }

};
const editarTutor = async () => {

  const formData = new FormData();

  formData.append("id_tutor", idTutorEditar);
  formData.append("id_usuario", idUsuarioEditar);

  formData.append("nombre", nombre);
  formData.append("departamento", departamento);

  const response = await fetch(
    "http://127.0.0.1/tutores-api/editar_tutor.php",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();

  if (data.success) {

    alert("Tutor actualizado");

    setShowModal(false);

    window.location.reload();

  }

};
const abrirEditarTutor = (tutor: any) => {

  setEditando(true);

  setShowModal(true);

  setIdTutorEditar(tutor.id_tutor);

  setIdUsuarioEditar(tutor.id_usuario);

  setNombre(tutor.nombre);

  setDepartamento(tutor.departamento);

};

const eliminarTutor = async () => {

  if (!tutorEliminar) return;

  const formData = new FormData();

  formData.append("id_tutor", tutorEliminar.id_tutor);

  const response = await fetch(
    "http://127.0.0.1/tutores-api/eliminar_tutor.php",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();

  if (data.success) {

    setShowDeleteModal(false);

    window.location.reload();

  }

};
  useEffect(() => {

  fetch("http://127.0.0.1/tutores-api/obtener_tutores.php")
    .then((response) => response.json())
    .then((data) => {

      console.log(data);

      setTutors(data);

    });

}, []);
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold mb-1">Gestión de Tutores</h2>
          
        </div>
            {
      showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[400px]">

            <h2 className="text-xl font-semibold mb-4">
              Actualizar tutor
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              <input
                type="text"
                placeholder="Departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancelar
              </button>

              <button
                onClick={editando ? editarTutor : agregarTutor}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Guardar
                
              </button>

            </div>

          </div>

        </div>

      )


    }

      {
  showDeleteModal && (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-[400px]">

        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Eliminar tutor
        </h2>

        <p className="text-gray-700">
          ¿Seguro que deseas eliminar a:
        </p>

        <p className="font-semibold mt-2">
          {tutorEliminar?.nombre} ?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={eliminarTutor}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Eliminar
          </button>

        </div>

      </div>

    </div>

  )
}


        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" 
          >
        
          <Plus className="w-4 h-4" />
          Agregar tutor
          
        </button>
      </div>

      {/* Stats Cards */}


    

      {/* Tutors Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold">Lista de tutores</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar tutor..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
  <tr>

    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
      Tutor
    </th>

    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
      Departamento
    </th>

    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
      Acciones
    </th>

  </tr>
</thead>
          <tbody>
  {tutors.map((tutor) => (
    <tr
      key={tutor.id_tutor}
      className="border-b border-gray-100 hover:bg-gray-50"
    >
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            {tutor.nombre?.split(' ')[1]?.charAt(0)}
            {tutor.nombre?.split(' ')[2]?.charAt(0)}
          </div>

          <div>
            <p className="font-medium text-sm">
              {tutor.nombre}
            </p>

            <p className="text-xs text-gray-500">
              {tutor.departamento}
            </p>
          </div>

        </div>
      </td>

      <td className="py-4 px-6 text-sm text-gray-700">
        {tutor.departamento}
      </td>

      <td className="py-4 px-6">
  <div className="flex gap-2">

    <button
      onClick={() => abrirEditarTutor(tutor)}
      className="p-1 hover:bg-gray-100 rounded"
    >
      <Edit className="w-4 h-4 text-gray-600" />
    </button>

    <button
      onClick={() => {

  setTutorEliminar(tutor);

  setShowDeleteModal(true);

}}

      className="p-1 hover:bg-gray-100 rounded"
    >
      <Trash2 className="w-4 h-4 text-red-600" />
    </button>

  </div>
</td>
      

    </tr>
  ))}
</tbody>  
          </table>
        </div>
      </div>
    </div>
  );
}
