import React from 'react';
import { LifeBuoy, Book, Mail } from 'lucide-react';

const Support = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Support</h1>
      <p className="text-lg text-gray-600 mb-8">Need help? We've got you covered. Find the resources you need below.</p>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="card">
          <div className="card-body">
            <LifeBuoy className="h-12 w-12 mx-auto text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-gray-600 mb-4">Join our community on Discord or Telegram to get help from other users and developers.</p>
            <a href="#" className="font-medium text-primary-600">Join Discord</a>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <Book className="h-12 w-12 mx-auto text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Documentation</h3>
            <p className="text-gray-600 mb-4">Find detailed guides, API references, and command examples in our documentation.</p>
            <a href="/documentation" className="font-medium text-primary-600">Read Docs</a>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <Mail className="h-12 w-12 mx-auto text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">For business inquiries or critical issues, you can reach out to our support team directly.</p>
            <a href="mailto:support@botalto.com" className="font-medium text-primary-600">support@botalto.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
