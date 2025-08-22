import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-8">We'd love to hear from you. Reach out with any questions or feedback.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input type="text" id="name" className="input" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="email" id="email" className="input" placeholder="Your Email" />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea id="message" rows="5" className="textarea" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
            </form>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold">Our Office</h3>
              <p className="text-gray-600">123 Bot Avenue, Tech City, 12345</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="h-6 w-6 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">contact@botalto.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="h-6 w-6 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">+1 (234) 567-890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
