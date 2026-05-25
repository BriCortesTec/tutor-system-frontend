import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export function RiskChart() {
  const data = [
    { id: 'alto', name: 'Riesgo alto', value: 38, color: '#ef4444' },
    { id: 'medio', name: 'Riesgo medio', value: 95, color: '#f59e0b' },
    { id: 'bajo', name: 'Riesgo bajo', value: 187, color: '#22c55e' },
    { id: 'sin', name: 'Sin riesgo', value: 203, color: '#3b82f6' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Estudiantes en riesgo</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.id}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry: any) => `${value}: ${entry.payload.value}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
