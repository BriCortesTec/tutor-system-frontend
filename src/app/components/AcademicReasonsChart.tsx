import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export function AcademicReasonsChart() {
  const data = [
    { id: '1', name: 'Problemas familiares', value: 45, color: '#3b82f6' },
    { id: '2', name: 'Bajo rendimiento', value: 65, color: '#10b981' },
    { id: '3', name: 'Ansiedad/Estrés', value: 35, color: '#f59e0b' },
    { id: '4', name: 'Otros', value: 28, color: '#ef4444' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Motivos de reporte académico</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry) => (
              <Cell key={entry.id} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={50}
            formatter={(value, entry: any) => {
              const percentage = ((entry.payload.value / total) * 100).toFixed(0);
              return `${value}: ${entry.payload.value} (${percentage}%)`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
