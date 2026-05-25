import { useState } from "react";
import { GraduationCap } from "lucide-react";
import logoITO from "../../assets/logoITO.png";

export default function Login() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const iniciarSesion = async () => {
  
  const formData = new FormData();
    
  formData.append("correo", correo);
  formData.append("password", password);

  const response = await fetch(
    "http://127.0.0.1/tutores-api/login.php",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  
  console.log(data);
  
  if (data.success === true) {

    localStorage.setItem("logueado", "true");
    localStorage.setItem("rol", data.rol);

    window.location.reload();

  } else {
    setError("No hay un usuario con esas credenciales.");

  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-200">

      <div className="bg-white w-[400px] rounded-3xl shadow-2xl p-10">

        <div className="flex flex-col items-center mb-8">

          <img
  src={logoITO}
  alt="ITO"
  className="w-24 h-24 object-contain mb-4"
/>

          <h1 className="text-3xl font-bold text-gray-800">
            Tutorías
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Instituto Tecnológico de Oaxaca
          </p>

        </div>

        <div className="space-y-5">
        <div className="h-14">
  {
    error && (
      <div className="bg-red-100 text-red-600 p-4 rounded-xl text-sm">
        {error}
      </div>
    )
  }
</div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Contraseña
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        <button
        onClick={iniciarSesion}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-semibold shadow-lg"
      >
        Iniciar Sesión
      </button>

        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          © 2026 Sistema de Tutorías
        </p>

      </div>

    </div>
  );
}