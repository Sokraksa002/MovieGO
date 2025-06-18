import React from 'react';

const activities = [
  {
    id: 1,
    action: 'Added new episode',
    media: 'Stranger Things S4E5',
    user: 'Alex Johnson',
    time: '2 mins ago'
  },
  {
    id: 2,
    action: 'Updated genre',
    media: 'Sci-Fi → Science Fiction',
    user: 'Sam Rivera',
    time: '15 mins ago'
  },
  {
    id: 3,
    action: 'Uploaded new movie',
    media: 'Interstellar (2014)',
    user: 'Taylor Chen',
    time: '1 hour ago'
  },
  {
    id: 4,
    action: 'Suspended user',
    media: 'john.doe@example.com',
    user: 'Admin',
    time: '3 hours ago'
  }
];

const RecentActivity: React.FC = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex">
          <div className="relative">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">
              <span className="font-semibold">{activity.user}</span> {activity.action}
            </p>
            <p className="text-xs text-gray-600">{activity.media}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
      
      <button className="w-full mt-4 px-4 py-2 text-sm text-purple-600 font-medium border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
        View all activity
      </button>
    </div>
  );
};

export default RecentActivity;