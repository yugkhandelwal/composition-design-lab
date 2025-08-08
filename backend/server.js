const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Create tables if they don't exist
db.serialize(() => {
  // Contact messages table
  db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    read_at DATETIME,
    replied_at DATETIME
  )`);

  // Admin users table
  db.run(`CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
  )`);

  // Create default admin user if none exists
  const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = bcrypt.hashSync(defaultPassword, 10);
  
  db.run(`INSERT OR IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)`, 
    ['admin', hashedPassword]);
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for admin dashboard
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:8080'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many contact form submissions, please try again later.'
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many admin requests, please try again later.'
});

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Contact form submission
app.post('/api/contact', contactLimiter, [
  body('name').trim().isLength({ min: 2, max: 100 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('subject').optional().trim().isLength({ max: 200 }).escape(),
  body('message').trim().isLength({ min: 10, max: 2000 }).escape()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    console.log('Request body:', req.body);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { name, email, subject, message } = req.body;
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent');

  const query = `INSERT INTO contact_messages (name, email, subject, message, ip_address, user_agent) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(query, [name, email, subject, message, ipAddress, userAgent], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to save message'
      });
    }

    // Log successful submission
    console.log(`New contact form submission from ${email} (ID: ${this.lastID})`);

    res.json({
      success: true,
      message: 'Message sent successfully!',
      id: this.lastID
    });
  });
});

// Admin login
app.post('/api/admin/login', adminLimiter, [
  body('username').trim().isLength({ min: 3, max: 50 }),
  body('password').isLength({ min: 3 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input'
    });
  }

  const { username, password } = req.body;

  db.get('SELECT * FROM admin_users WHERE username = ?', [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (!bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    db.run('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username }
    });
  });
});

// Get all messages (admin only)
app.get('/api/admin/messages', authenticateToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const countQuery = 'SELECT COUNT(*) as total FROM contact_messages';
  const dataQuery = `SELECT * FROM contact_messages 
                     ORDER BY created_at DESC 
                     LIMIT ? OFFSET ?`;

  db.get(countQuery, (err, countResult) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    db.all(dataQuery, [limit, offset], (err, messages) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }

      res.json({
        success: true,
        data: {
          messages,
          pagination: {
            page,
            limit,
            total: countResult.total,
            pages: Math.ceil(countResult.total / limit)
          }
        }
      });
    });
  });
});

// Mark message as read (admin only)
app.patch('/api/admin/messages/:id/read', authenticateToken, (req, res) => {
  const messageId = parseInt(req.params.id);

  db.run('UPDATE contact_messages SET read_at = CURRENT_TIMESTAMP WHERE id = ?', 
    [messageId], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, message: 'Message marked as read' });
  });
});

// Delete message (admin only)
app.delete('/api/admin/messages/:id', authenticateToken, (req, res) => {
  const messageId = parseInt(req.params.id);

  db.run('DELETE FROM contact_messages WHERE id = ?', [messageId], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, message: 'Message deleted' });
  });
});

// Get dashboard stats (admin only)
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  const queries = [
    'SELECT COUNT(*) as total FROM contact_messages',
    'SELECT COUNT(*) as unread FROM contact_messages WHERE read_at IS NULL',
    'SELECT COUNT(*) as today FROM contact_messages WHERE date(created_at) = date("now")',
    'SELECT COUNT(*) as this_week FROM contact_messages WHERE date(created_at) >= date("now", "-7 days")'
  ];

  Promise.all(queries.map(query => 
    new Promise((resolve, reject) => {
      db.get(query, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    })
  )).then(results => {
    res.json({
      success: true,
      data: {
        total: results[0].total || results[0].total,
        unread: results[1].unread,
        today: results[2].today,
        thisWeek: results[3].this_week
      }
    });
  }).catch(err => {
    res.status(500).json({ success: false, message: 'Database error' });
  });
});

// Serve admin dashboard (static files)
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Default route
app.get('/', (req, res) => {
  res.json({
    name: 'Composition Design Lab API',
    version: '1.0.0',
    endpoints: {
      'POST /api/contact': 'Submit contact form',
      'POST /api/admin/login': 'Admin login',
      'GET /api/admin/messages': 'Get messages (admin)',
      'GET /api/admin/stats': 'Get dashboard stats (admin)',
      'GET /admin': 'Admin dashboard'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Admin dashboard: http://localhost:${PORT}/admin`);
  console.log(`🔑 Default admin credentials: admin / ${process.env.ADMIN_PASSWORD || 'admin123'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
