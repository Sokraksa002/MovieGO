// components/MediaChart.tsx
import React from 'react';

const MediaChart: React.FC = () => {
  const data = [
    { label: 'Movies', value: 45, color: 'bg-blue-500' },
    { label: 'TV Shows', value: 30, color: 'bg-purple-500' },
    { label: 'Episodes', value: 25, color: 'bg-cyan-400' }
  ];
  
  // Remove unused maxValue calculation
  // const maxValue = Math.max(...data.map(item => item.value)); 
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-500">
        <span>Media Distribution</span>
        <span>Last 30 days</span>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-medium text-gray-700">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`${item.color} h-2.5 rounded-full`} 
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-6 mt-8">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 ${item.color} rounded-full mr-2`}></div>
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaChart;