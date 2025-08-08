import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-montserrat font-semibold">Privacy Policy</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Last updated:</strong> August 8, 2025
            </p>
            
            <p className="mb-4">
              Composition Design Lab ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how your personal information is collected, used, and disclosed by Composition Design Lab.
            </p>
          </div>

          <section>
            <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Information You Provide to Us</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Project details and requirements when you inquire about our services</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Information We Collect Automatically</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Usage data (pages visited, time spent, clicks)</li>
                  <li>Device information (browser type, operating system, IP address)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">How We Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>To respond to your inquiries and provide our services</li>
              <li>To improve our website and user experience</li>
              <li>To send you updates about our services (with your consent)</li>
              <li>To comply with legal obligations</li>
              <li>To analyze website usage and performance</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Information Sharing and Disclosure</h3>
            <p className="mb-3">We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>With service providers who assist us in operating our website</li>
              <li>In connection with a business transaction (merger, acquisition, etc.)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Cookies and Tracking Technologies</h3>
            <p className="mb-3">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and advertisements</li>
              <li>Improve our website functionality</li>
            </ul>
            <p className="mt-3 text-gray-700">
              You can control cookies through your browser settings. However, disabling cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Data Security</h3>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Your Rights</h3>
            <p className="mb-3">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">International Data Transfers</h3>
            <p className="text-gray-700">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your information.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Changes to This Policy</h3>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-700 mb-2">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-1 text-gray-700">
              <li><strong>Email:</strong> privacy@compositiondesignlab.com</li>
              <li><strong>Phone:</strong> (123) 456-7890</li>
              <li><strong>Address:</strong> 123 Design Street, Architecture City, AC 12345</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
