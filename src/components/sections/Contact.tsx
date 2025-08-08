
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { trackPhoneCall, trackEmailClick, trackContactForm } from '../../lib/analytics';
import { submitContactForm, type ContactFormData } from '../../lib/formSubmission';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    console.log('🚀 Form submission started with data:', formData);
    
    // Show alert to user for debugging
    alert('Form submission started! Check the browser console for details.');
    
    try {
      // Basic form validation
      if (!formData.name.trim()) {
        throw new Error('Please enter your name');
      }
      
      if (!formData.email.trim()) {
        throw new Error('Please enter your email address');
      }
      
      if (!formData.message.trim()) {
        throw new Error('Please enter your message');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      console.log('✅ Form validation passed');

      // Track form submission attempt
      try {
        trackContactForm('submit');
        console.log('✅ Analytics tracked');
      } catch (trackingError) {
        console.warn('⚠️ Analytics tracking failed:', trackingError);
        // Don't fail the form submission for tracking errors
      }

      // Submit form using the form submission service
      console.log('📤 Calling submitContactForm...');
      const response = await submitContactForm(formData);
      console.log('📋 Form submission response:', response);
      
      if (response.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        console.log('🎉 Form submitted successfully');
        alert('SUCCESS! Form submitted successfully. Check your Formspree dashboard.');
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('💥 Form submission error:', error);
      setSubmitStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
      setErrorMessage(errorMessage);
      console.error('❌ Error details:', errorMessage);
      alert('ERROR: ' + errorMessage + '. Check the browser console for details.');
      
      // Auto-hide error message after 10 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 10000);
    } finally {
      setIsSubmitting(false);
    }
  };
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
            <form className="bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
              <h3 className="text-2xl mb-6">Send us a message</h3>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center">
                  <CheckCircle size={20} className="text-green-600 mr-3" />
                  <p className="text-green-800">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
                  <AlertCircle size={20} className="text-red-600 mr-3" />
                  <p className="text-red-800">{errorMessage}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-montserrat mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-arch-primary focus:border-transparent"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-montserrat mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-arch-primary focus:border-transparent"
                    required
                    disabled={isSubmitting}
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
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-arch-primary focus:border-transparent"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-montserrat mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-arch-primary focus:border-transparent resize-none"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`btn-primary flex items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={18} className="ml-2" />
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
