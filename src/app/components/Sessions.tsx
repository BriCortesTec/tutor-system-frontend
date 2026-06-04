import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Sesion {
  id_sesion: string;
  id_alumno: string;
  nombre_alumno: string;
  fecha: string;
  tema: string;
  notas: string;
  estatus: string;
}

interface Alumno {
  id_alumno: string;
  nombre: string;
  apellido: string;
}

interface SesionForm {
  id_alumno: string;
  fecha: string;
  tema: string;
  notas: string;
}

const API_BASE = "http://localhost/tutor-system-api";

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Sessions() {
  // Lista de sesiones
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [cargando, setCargando] = useState(true);

  // Alumnos para el select del formulario
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  // Control del modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  // Campos del formulario
  const [form, setForm] = useState<SesionForm>({
    id_alumno: "",
    fecha: "",
    tema: "",
    notas: "",
  });

  // ── Cargar sesiones y alumnos al montar ──────────────────────────────────
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/obtener_sesiones.php`).then((r) => r.json()),
      fetch(`${API_BASE}/obtener_alumnos.php`).then((r) => r.json()),
    ])
      .then(([dataSesiones, dataAlumnos]) => {
        setSesiones(dataSesiones);
        setAlumnos(dataAlumnos);
        setCargando(false);
      })
      .catch(() => {
        setMensajeError("No se pudieron cargar los datos.");
        setCargando(false);
      });
  }, []);

  // ── Abrir modal ──────────────────────────────────────────────────────────
  function abrirModal() {
    setForm({ id_alumno: "", fecha: "", tema: "", notas: "" });
    setMensajeExito("");
    setMensajeError("");
    setModalAbierto(true);
  }

  // ── Guardar sesión ────────────────────────────────────────────────────────
  async function guardarSesion() {
    if (!form.id_alumno || !form.fecha || !form.tema.trim()) {
      setMensajeError("Alumno, fecha y tema son obligatorios.");
      return;
    }

    setGuardando(true);
    setMensajeError("");

    try {
      const res = await fetch(`${API_BASE}/agregar_sesion.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        // Recargar la lista de sesiones
        const nuevasSesiones = await fetch(
          `${API_BASE}/obtener_sesiones.php`
        ).then((r) => r.json());
        setSesiones(nuevasSesiones);

        setMensajeExito("Sesión registrada correctamente.");
        setTimeout(() => {
          setModalAbierto(false);
          setMensajeExito("");
        }, 1500);
      } else {
        setMensajeError("No se pudo guardar la sesión. Intenta de nuevo.");
      }
    } catch {
      setMensajeError("Error de conexión con el servidor.");
    } finally {
      setGuardando(false);
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function formatearFecha(fechaISO: string) {
    if (!fechaISO) return "—";
    const [year, month, day] = fechaISO.split("-");
    return `${day}/${month}/${year}`;
  }

  function colorEstatus(estatus: string) {
    if (!estatus) return "text-muted-foreground";
    const e = estatus.toLowerCase();
    if (e === "completado") return "text-green-600 font-medium";
    if (e === "pendiente") return "text-amber-600 font-medium";
    return "text-muted-foreground";
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Sesiones</h1>

        {/* ✅ BOTÓN AGREGAR SESIÓN — onClick conectado */}
        <Button onClick={abrirModal}>+ Sesión</Button>
      </div>

      {cargando && (
        <p className="text-muted-foreground">Cargando sesiones...</p>
      )}

      {!cargando && sesiones.length === 0 && (
        <p className="text-muted-foreground">No hay sesiones registradas.</p>
      )}

      {/* ── Tabla de sesiones ── */}
      {!cargando && sesiones.length > 0 && (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Alumno</th>
                <th className="px-4 py-3 text-left font-medium">Fecha</th>
                <th className="px-4 py-3 text-left font-medium">Tema</th>
                <th className="px-4 py-3 text-left font-medium">Notas</th>
                <th className="px-4 py-3 text-left font-medium">Estatus</th>
              </tr>
            </thead>
            <tbody>
              {sesiones.map((sesion) => (
                <tr
                  key={sesion.id_sesion}
                  className="border-t hover:bg-muted/30"
                >
                  <td className="px-4 py-3">{sesion.nombre_alumno}</td>
                  <td className="px-4 py-3">{formatearFecha(sesion.fecha)}</td>
                  <td className="px-4 py-3">{sesion.tema}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{sesion.notas || "—"}</td>
                  <td className={`px-4 py-3 ${colorEstatus(sesion.estatus)}`}>
                    {sesion.estatus || "Pendiente"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal agregar sesión ── */}
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nueva sesión</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Alumno */}
            <div className="space-y-1">
              <Label>Alumno *</Label>
              <Select
                value={form.id_alumno}
                onValueChange={(val) => setForm({ ...form, id_alumno: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un alumno" />
                </SelectTrigger>
                <SelectContent>
                  {alumnos.map((a) => (
                    <SelectItem key={a.id_alumno} value={a.id_alumno}>
                      {a.nombre} {a.apellido}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fecha */}
            <div className="space-y-1">
              <Label htmlFor="s-fecha">Fecha *</Label>
              <Input
                id="s-fecha"
                type="date"
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              />
            </div>

            {/* Tema */}
            <div className="space-y-1">
              <Label htmlFor="s-tema">Tema *</Label>
              <Input
                id="s-tema"
                placeholder="Ej: Derivadas e integrales"
                value={form.tema}
                onChange={(e) => setForm({ ...form, tema: e.target.value })}
              />
            </div>

            {/* Notas */}
            <div className="space-y-1">
              <Label htmlFor="s-notas">Notas</Label>
              <Textarea
                id="s-notas"
                placeholder="Observaciones de la sesión..."
                rows={3}
                value={form.notas}
                onChange={(e) => setForm({ ...form, notas: e.target.value })}
              />
            </div>

            {/* Feedback */}
            {mensajeExito && (
              <p className="text-sm text-green-600 font-medium">{mensajeExito}</p>
            )}
            {mensajeError && (
              <p className="text-sm text-red-500">{mensajeError}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalAbierto(false)}
              disabled={guardando}
            >
              Cancelar
            </Button>
            <Button onClick={guardarSesion} disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar sesión"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
