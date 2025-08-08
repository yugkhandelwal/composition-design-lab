// Vercel Serverless Function for Contact Form
import { createConnection } from '../lib/database.js';

// Simple in-memory storage for demo (use a real database in production)
let messages = [];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters'
      });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (!message || message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters'
      });
    }

    // Store message (in production, use a database)
    const newMessage = {
      id: Date.now(),
      name,
      email,
      subject: subject || '',
      message,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };

    messages.push(newMessage);

    // Log for Vercel
    console.log('New contact form submission:', {
      email,
      name,
      timestamp: newMessage.timestamp
    });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      id: newMessage.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
}
