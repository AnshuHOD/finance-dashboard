import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip 
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const COLORS = [
  '#3FB950', '#F85149', '#58A6FF', '#D29922', 
  '#BC8CFF', '#F0883E', '#FF7B72', '#2EA043'
];

const SpendingBreakdown = ({ data }) => {
  const { darkMode } = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary-card border border-primary-border p-3 rounded-lg shadow-xl">
          <p className="text-sm font-bold text-text-primary mb-1">{payload[0].name}</p>
          <p className="text-sm text-text-secondary">
            ₹{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            animationBegin={500}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={darkMode ? '#161B22' : '#FFFFFF'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-xs text-text-secondary">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingBreakdown;
