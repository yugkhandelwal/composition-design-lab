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

// Fallback method using FormData
export const submitToFormspreeFormData = async (data: ContactFormData): Promise<FormSubmissionResponse> => {
  const FORMSPREE_URL = 'https://formspree.io/f/mvgqvyve';
  
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('subject', data.subject);
    formData.append('message', data.message);

    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: formData,
    });

    if (response.ok || response.status === 302) {
      return { success: true, message: 'Message sent successfully!' };
    } else {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Formspree FormData error:', response.status, errorText);
      throw new Error(`Failed to send message: ${response.status}`);
    }
  } catch (error) {
    console.error('FormData submission error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
    };
  }
};

// Option 1: Formspree (Recommended - Free tier available)
export const submitToFormspree = async (data: ContactFormData): Promise<FormSubmissionResponse> => {
  const FORMSPREE_URL = 'https://formspree.io/f/mvgqvyve'; // Your Formspree form endpoint
  
  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });

    // Check if the response is ok or if it's a redirect (Formspree sometimes redirects)
    if (response.ok || response.status === 302) {
      return { success: true, message: 'Message sent successfully!' };
    } else {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Formspree error:', response.status, errorText);
      throw new Error(`Failed to send message: ${response.status}`);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send message. Please check your connection and try again.' 
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
  // Try JSON submission first, fallback to FormData if it fails
  try {
    const jsonResult = await submitToFormspree(data);
    if (jsonResult.success) {
      return jsonResult;
    }
    
    // If JSON failed, try FormData
    console.log('JSON submission failed, trying FormData...');
    return await submitToFormspreeFormData(data);
  } catch (error) {
    // If both fail, try FormData as final fallback
    console.log('Both methods failed, trying final FormData fallback...');
    try {
      return await submitToFormspreeFormData(data);
    } catch (fallbackError) {
      return {
        success: false,
        message: 'Unable to send message. Please try again later or contact us directly.'
      };
    }
  }
};
