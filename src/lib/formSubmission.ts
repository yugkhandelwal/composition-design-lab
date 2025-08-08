// Form submission service configuration
// Choose your preferred form handling service

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormSubmissionResponse {
  success: boolean;
  message?: string;
}

// Option 1: Formspree (Recommended - Free tier available)
export const submitToFormspree = async (data: ContactFormData): Promise<FormSubmissionResponse> => {
  const FORMSPREE_URL = 'https://formspree.io/f/mvgqvyve'; // Your Formspree form endpoint
  
  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true, message: 'Message sent successfully!' };
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send message' 
    };
  }
};

// Option 2: Netlify Forms (If deployed on Netlify)
export const submitToNetlify = async (data: ContactFormData): Promise<FormSubmissionResponse> => {
  try {
    const formData = new FormData();
    formData.append('form-name', 'contact');
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    });

    if (response.ok) {
      return { success: true, message: 'Message sent successfully!' };
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send message' 
    };
  }
};

// Option 3: Email.js (Client-side email service)
export const submitToEmailJS = async (data: ContactFormData): Promise<FormSubmissionResponse> => {
  // Note: You need to install emailjs-com: npm install @emailjs/browser
  // import emailjs from '@emailjs/browser';
  
  try {
    // Replace with your EmailJS service ID, template ID, and public key
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    // Uncomment when you have EmailJS configured:
    // const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
    // return { success: true, message: 'Message sent successfully!' };
    
    // Placeholder for now
    throw new Error('EmailJS not configured');
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send message' 
    };
  }
};

// Option 4: Custom Backend API
export const submitToCustomAPI = async (data: ContactFormData): Promise<FormSubmissionResponse> => {
  const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001/api/contact'
    : '/api/contact'; // Vercel serverless function
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true, message: result.message || 'Message sent successfully!' };
    } else {
      // Handle validation errors specifically
      if (result.errors && Array.isArray(result.errors)) {
        const errorMessages = result.errors.map((err: any) => `${err.path}: ${err.msg}`).join(', ');
        throw new Error(`Validation failed: ${errorMessages}`);
      }
      throw new Error(result.message || 'Failed to send message');
    }
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send message' 
    };
  }
};

// Demo/Development mode - simulates successful form submission
export const submitDemo = async (data: ContactFormData): Promise<FormSubmissionResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate success (you can change this to test error states)
  return { success: true, message: 'Demo: Message received! (Not actually sent)' };
};

// Main form submission function - choose your preferred service
export const submitContactForm = async (data: ContactFormData): Promise<FormSubmissionResponse> => {
  // Choose your preferred submission method:
  
  // For Formspree (guaranteed to work and show requests):
  return submitToFormspree(data);
  
  // For local development backend (to see requests in real-time):
  // return submitToCustomAPI(data);
  
  // For development/demo:
  // return submitDemo(data);
  
  // For Netlify Forms:
  // return submitToNetlify(data);
  
  // For EmailJS:
  // return submitToEmailJS(data);
};
