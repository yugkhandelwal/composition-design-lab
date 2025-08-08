
import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { trackPhoneCall, trackEmailClick, trackContactForm } from '../../lib/analytics';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="mb-4">Get In Touch</h2>
          <p className="text-lg text-arch-secondary max-w-3xl mx-auto">
            We'd love to hear from you. Contact us for inquiries about our services,
            project collaborations, or to schedule a consultation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-arch-primary text-white p-8 h-full">
              <h3 className="text-2xl mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin size={24} className="mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-montserrat font-medium mb-1">Address</h4>
                    <address className="not-italic text-gray-300">
                      123 Architecture Avenue<br />
                      Design District<br />
                      City, State 12345
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={24} className="mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-montserrat font-medium mb-1">Phone</h4>
                    <a 
                      href="tel:+1234567890" 
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => trackPhoneCall()}
                    >
                      (123) 456-7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={24} className="mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-montserrat font-medium mb-1">Email</h4>
                    <a 
                      href="mailto:info@compositiondesignlab.com" 
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => trackEmailClick()}
                    >
                      info@compositiondesignlab.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="font-montserrat font-medium mb-4">Office Hours</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                  <li>Saturday: 10:00 AM - 2:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl mb-6">Send us a message</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-montserrat mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-arch-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-montserrat mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-arch-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-montserrat mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-arch-primary focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-montserrat mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-arch-primary focus:border-transparent resize-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-primary flex items-center"
              >
                Send Message <Send size={18} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Google Map */}
        <div className="mt-16 h-96 bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03612256163!2d-74.25986762856839!3d40.69766374846751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1682352331181!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
