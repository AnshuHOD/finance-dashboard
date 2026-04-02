import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const BalanceTrendChart = ({ data }) => {
  const { darkMode } = useTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary-card border border-primary-border p-3 rounded-lg shadow-xl">
          <p className="text-xs text-text-secondary mb-1">{label}</p>
          <p className="text-sm font-bold text-accent-blue">
            Balance: ₹{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#58A6FF" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#58A6FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke={darkMode ? '#30363D' : '#D0D7DE'} 
          />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: darkMode ? '#8B949E' : '#636C76', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: darkMode ? '#8B949E' : '#636C76', fontSize: 10 }}
            tickFormatter={(value) => `₹${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#58A6FF', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#58A6FF" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorBalance)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
