// Vercel Serverless Function for Contact Form - Public API
export default function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests for contact form
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

    // Log for Vercel (enhanced logging)
    const logData = {
      timestamp: newMessage.timestamp,
      email,
      name,
      subject: subject || 'No subject',
      messageLength: message.length,
      ip: req.headers['x-forwarded-for'] || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      referer: req.headers.referer || 'direct'
    };
    
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log(JSON.stringify(logData, null, 2));
    console.log('====================================');

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
