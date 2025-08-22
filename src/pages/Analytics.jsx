import React from 'react';
import { BarChart3 } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <BarChart3 className="mx-auto h-16 w-16 text-primary-500" />
      <h1 className="mt-6 text-4xl font-extrabold text-gray-900">Analytics Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">
        Coming Soon!
      </p>
      <p className="mt-2 text-gray-500">
        We are working hard to bring you detailed analytics about your bot's performance, command usage, and user engagement.
      </p>
    </div>
  );
};

export default Analytics;
