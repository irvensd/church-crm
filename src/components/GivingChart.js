import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GivingChart = () => {
  // Sample data for the giving chart
  const data = [
    { month: 'Jan', general: 4000, missions: 2400, building: 1200 },
    { month: 'Feb', general: 4500, missions: 2100, building: 1300 },
    { month: 'Mar', general: 5000, missions: 2600, building: 1500 },
    { month: 'Apr', general: 4800, missions: 2800, building: 1400 },
    { month: 'May', general: 5200, missions: 3000, building: 1600 },
    { month: 'Jun', general: 5500, missions: 3200, building: 1700 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
          <Bar dataKey="general" name="General Fund" fill="#4F46E5" />
          <Bar dataKey="missions" name="Missions" fill="#10B981" />
          <Bar dataKey="building" name="Building Fund" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GivingChart; 