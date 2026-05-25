import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function TutorshipChart() {
  const data = [
    { mes: 'Oct', tutorias: 85 },
    { mes: 'Nov', tutorias: 92 },
    { mes: 'Dic', tutorias: 78 },
    { mes: 'Ene', tutorias: 95 },
    { mes: 'Feb', tutorias: 110 },
    { mes: 'Mar', tutorias: 118 }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Reporte de tutorías últimas 6 meses</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="mes" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="tutorias"
            name="Tutorías"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
