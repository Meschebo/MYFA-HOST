import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Settings, PlayCircle, CheckCircle } from 'lucide-react';

const RenderDeploymentGuide = () => {
  const steps = [
    {
      title: 'Sign Up for Render',
      content: 'Go to <a href="https://render.com" target="_blank" rel="noopener noreferrer" class="font-medium text-primary-600 hover:underline">render.com</a> and sign up using your GitHub account. This is the easiest way to connect your repository.',
      icon: Github,
    },
    {
      title: 'Create a New Web Service',
      content: 'From the Render Dashboard, click the <strong>"New +"</strong> button and select <strong>"Web Service"</strong>. This will start the deployment process.',
      icon: PlayCircle,
    },
    {
      title: 'Connect Your Repository',
      content: 'Render will ask you to connect a repository. Select your BotAlto project repository from the list. If you don\'t see it, you may need to click "Configure account" to grant Render access to it.',
      icon: Github,
    },
    {
      title: 'Configure the Service Settings',
      content: 'This is the most important step. Fill out the form with the following settings:',
      details: [
        '<strong>Name:</strong> A unique name for your service (e.g., `botalto-backend`).',
        '<strong>Region:</strong> Choose a region closest to you.',
        '<strong>Branch:</strong> `main` (or your default branch).',
        '<strong>Build Command:</strong> `yarn install`',
        '<strong>Start Command:</strong> `yarn start`',
        '<strong>Instance Type:</strong> Select the <strong>Free</strong> tier.',
      ],
      icon: Settings,
    },
    {
      title: 'Add Environment Variables',
      content: 'Before creating the service, scroll down to the "Advanced" section and click <strong>"Add Environment Variable"</strong>. You need to add your MongoDB connection string:',
      details: [
        '<strong>Key:</strong> `MONGO_URI`',
        '<strong>Value:</strong> `mongodb+srv://hellokaiiddo:0Mgb6Peq3UlsNpCD@cluster0.azbh81j.mongodb.net/?retryWrites=true&w=majority`',
        '<strong>Key:</strong> `PORT` (Optional, Render sets this automatically)',
        '<strong>Value:</strong> `3000`',
      ],
      icon: Settings,
    },
    {
      title: 'Deploy and Verify',
      content: 'Click the <strong>"Create Web Service"</strong> button. Render will start building and deploying your application. You can watch the logs in real-time.',
      details: [
        'Look for the success messages: `✅ Connected to MongoDB!` and `⚡ BotAlto server on :...`',
        'Once deployed, Render will provide you with a public URL on your dashboard (e.g., `https://botalto-backend.onrender.com`). This is the URL you will use for your Netlify site.',
      ],
      icon: CheckCircle,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/deployment-guide" className="btn-outline mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Main Guide
      </Link>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Step-by-Step: Deploying to Render</h1>
      <p className="text-lg text-gray-600 mb-8">
        Follow this detailed guide to get your Node.js backend live on Render.
      </p>

      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">
              {index + 1}
            </div>
            <div className="flex-1 pt-1">
              <h2 className="text-xl font-bold text-gray-800">{step.title}</h2>
              <p className="mt-1 text-gray-600" dangerouslySetInnerHTML={{ __html: step.content }}></p>
              {step.details && (
                <ul className="mt-3 list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-4 rounded-lg border">
                  {step.details.map((detail, dIndex) => (
                    <li key={dIndex} dangerouslySetInnerHTML={{ __html: detail }}></li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 card bg-green-50 border-green-200">
        <div className="card-body">
            <h3 className="text-xl font-bold text-green-800">What's Next?</h3>
            <p className="mt-2 text-green-700">
              Once your backend is live and you have the URL, go to your Netlify site settings and add the `VITE_API_URL` environment variable with your new Render URL. Redeploy your Netlify site, and your platform will be fully connected!
            </p>
        </div>
      </div>
    </div>
  );
};

export default RenderDeploymentGuide;
