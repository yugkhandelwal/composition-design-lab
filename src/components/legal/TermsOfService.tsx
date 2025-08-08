import React from 'react';
import { X } from 'lucide-react';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-montserrat font-semibold">Terms of Service</h2>
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
              These Terms of Service ("Terms") govern your use of the Composition Design Lab website 
              and services provided by Composition Design Lab ("Company," "we," "our," or "us").
            </p>
          </div>

          <section>
            <h3 className="text-xl font-semibold mb-3">Acceptance of Terms</h3>
            <p className="text-gray-700">
              By accessing and using our website, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Description of Services</h3>
            <p className="mb-3">Composition Design Lab provides architectural design services including:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Residential architectural design</li>
              <li>Commercial architectural design</li>
              <li>Interior design services</li>
              <li>Urban planning consultation</li>
              <li>Sustainable design solutions</li>
              <li>Project management services</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Use of Website</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Permitted Use</h4>
                <p className="text-gray-700 mb-2">You may use our website for:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Viewing our portfolio and services</li>
                  <li>Contacting us for legitimate business inquiries</li>
                  <li>Accessing company information</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Prohibited Use</h4>
                <p className="text-gray-700 mb-2">You may not:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Use the website for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Transmit viruses, malware, or harmful code</li>
                  <li>Scrape or harvest data from our website</li>
                  <li>Interfere with the website's functionality</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Intellectual Property Rights</h3>
            <p className="text-gray-700 mb-3">
              The content on this website, including but not limited to text, graphics, images, logos, 
              and software, is the property of Composition Design Lab and is protected by copyright, 
              trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-700">
              You may not reproduce, distribute, modify, or create derivative works of our content 
              without our express written permission.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Project Terms and Conditions</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Project Proposals</h4>
                <p className="text-gray-700">
                  All project proposals are valid for 30 days from the date of issuance unless otherwise specified. 
                  Proposals become binding contracts only upon written acceptance by both parties.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Payment Terms</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Initial consultation fees are due upon booking</li>
                  <li>Project payments are typically structured in phases</li>
                  <li>Final payment is due upon project completion</li>
                  <li>Late payments may incur additional charges</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Project Changes</h4>
                <p className="text-gray-700">
                  Any changes to the agreed project scope must be documented in writing and may result 
                  in additional charges and timeline adjustments.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
            <p className="text-gray-700">
              To the fullest extent permitted by law, Composition Design Lab shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages, including without limitation 
              loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Professional Standards</h3>
            <p className="text-gray-700">
              We adhere to all applicable professional standards, building codes, and regulations. 
              However, clients are responsible for obtaining all necessary permits and approvals 
              for their projects.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Termination</h3>
            <p className="text-gray-700">
              We reserve the right to terminate or suspend access to our services immediately, 
              without prior notice, for any reason, including breach of these Terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Governing Law</h3>
            <p className="text-gray-700">
              These Terms shall be governed by and construed in accordance with the laws of the 
              state/jurisdiction where Composition Design Lab is incorporated, without regard to 
              its conflict of law provisions.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Changes to Terms</h3>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. We will notify users of any 
              material changes by posting the new Terms on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
            <p className="text-gray-700 mb-2">
              For questions about these Terms of Service, please contact us:
            </p>
            <ul className="space-y-1 text-gray-700">
              <li><strong>Email:</strong> legal@compositiondesignlab.com</li>
              <li><strong>Phone:</strong> (123) 456-7890</li>
              <li><strong>Address:</strong> 123 Design Street, Architecture City, AC 12345</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
