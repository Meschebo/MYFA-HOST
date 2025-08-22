import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Terminal, Settings, CheckCircle } from 'lucide-react';

const DeploymentGuide = () => {
  const steps = [
    {
      title: 'Deploy Your Node.js Backend',
      description: 'Your backend (server.js) needs to be running on a server hosting platform. Netlify cannot run your Node.js server.',
      points: [
        'Choose a backend hosting service like Render, Railway, or Heroku.',
        'Connect your GitHub repository to the service.',
        'The service should automatically detect it as a Node.js app and use `yarn start` to run it.',
        'You will get a public URL for your backend (e.g., https://botalto-backend.onrender.com).',
      ],
      icon: Terminal,
    },
    {
      title: 'Set Backend Environment Variables',
      description: 'Your live backend needs your MongoDB connection string to work.',
      points: [
        'In your chosen backend hosting service (Render, Railway, etc.), find the "Environment Variables" section.',
        'Add a new variable named `MONGO_URI` and paste your full MongoDB connection string as the value.',
      ],
      icon: Settings,
    },
    {
      title: 'Connect Your Frontend to Your Backend',
      description: 'Tell your Netlify frontend where to find your live backend.',
      points: [
        'Go to your site settings on Netlify.',
        'Navigate to "Site configuration" > "Environment variables".',
        'Add a new environment variable:',
        'Key: `VITE_API_URL`',
        'Value: Your live backend URL (e.g., https://botalto-backend.onrender.com)',
      ],
      icon: ExternalLink,
    },
    {
      title: 'Redeploy on Netlify',
      description: 'The final step is to trigger a new build on Netlify to apply the environment variable.',
      points: [
        'In Netlify, go to your site\'s "Deploys" section.',
        'Click the "Trigger deploy" dropdown and select "Deploy site".',
        'Once the new build is complete, your frontend will be connected to your backend, and the error will be resolved.',
      ],
      icon: CheckCircle,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Deployment Guide</h1>
      <p className="text-lg text-gray-600 mb-8">
        Follow these steps to connect your deployed frontend on Netlify to your backend server and fix the "Failed to fetch" errors.
      </p>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={step.title} className="card">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary-100 text-primary-600 rounded-lg h-12 w-12 flex items-center justify-center">
                  <step.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Step {index + 1}: {step.title}</h2>
                  <p className="mt-1 text-gray-600">{step.description}</p>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                    {step.points.map((point, pIndex) => (
                      <li key={pIndex} dangerouslySetInnerHTML={{ __html: point.replace(/`([^`]+)`/g, '<code class=\"bg-gray-200 text-gray-800 font-mono px-1 py-0.5 rounded\">$1</code>') }}></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
       <div className="mt-12 text-center">
          <Link to="/bots" className="btn-primary">
            Back to Bot Manager
          </Link>
        </div>
    </div>
  );
};

export default DeploymentGuide;
