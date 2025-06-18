// components/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  const isPositive = change.includes('+');
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <svg 
          className={`w-4 h-4 mr-1 ${isPositive ? '' : 'rotate-180'}`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
        <span>{change}</span>
      </div>
    </div>
  );
};

export default StatCard;