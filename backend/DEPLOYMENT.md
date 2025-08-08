# Backend Deployment Guide

This guide shows how to deploy your backend system to various platforms.

## Option 1: Vercel (Serverless Functions)

### 1. Create API Routes Structure
Create a `api` folder in your project root for Vercel serverless functions:

```
/api
  /admin
    login.js
    messages.js
    stats.js
  contact.js
```

### 2. Convert Express Routes to Vercel Functions
Each endpoint becomes a separate file. Example for contact form:

**api/contact.js**:
```javascript
import { createConnection } from '../backend/database.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Your contact form logic here
  // Use Vercel's environment variables
}
```

### 3. Configure vercel.json
```json
{
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "env": {
    "JWT_SECRET": "@jwt_secret",
    "ADMIN_USERNAME": "@admin_username", 
    "ADMIN_PASSWORD": "@admin_password"
  }
}
```

## Option 2: Railway

### 1. Connect Repository
- Connect your GitHub repository to Railway
- Railway will auto-detect Node.js

### 2. Environment Variables
Set in Railway dashboard:
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NODE_ENV=production`

### 3. Railway Configuration
Create `railway.toml`:
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "cd backend && npm start"
```

## Option 3: Heroku

### 1. Create Heroku App
```bash
heroku create composition-backend
```

### 2. Configure Environment
```bash
heroku config:set JWT_SECRET=your_secret_here
heroku config:set ADMIN_USERNAME=admin
heroku config:set ADMIN_PASSWORD=secure_password
heroku config:set NODE_ENV=production
```

### 3. Create Procfile
```
web: cd backend && npm start
```

### 4. Deploy
```bash
git add .
git commit -m "Deploy backend"
git push heroku main
```

## Option 4: DigitalOcean App Platform

### 1. Create App Spec
```yaml
name: composition-backend
services:
- name: api
  source_dir: /backend
  github:
    repo: your-username/composition-design-lab
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: JWT_SECRET
    value: your_secret_here
    type: SECRET
  - key: ADMIN_USERNAME
    value: admin
    type: SECRET
  - key: ADMIN_PASSWORD
    value: secure_password
    type: SECRET
```

## Option 5: Self-Hosted VPS

### 1. Setup Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### 2. Deploy Code
```bash
# Clone repository
git clone https://github.com/your-username/composition-design-lab.git
cd composition-design-lab/backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
nano .env  # Edit with production values
```

### 3. Start with PM2
```bash
# Start application
pm2 start server.js --name "composition-backend"

# Setup auto-restart
pm2 startup
pm2 save

# Monitor
pm2 status
pm2 logs composition-backend
```

### 4. Nginx Reverse Proxy
```bash
# Install nginx
sudo apt install nginx

# Configure site
sudo nano /etc/nginx/sites-available/composition-backend
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/composition-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Install SSL certificate
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Database Considerations

### SQLite (Current)
- ✅ Simple setup
- ✅ No separate database server needed
- ❌ Single connection limit
- ❌ Not ideal for high traffic

### PostgreSQL (Recommended for Production)
Install pg package and update database configuration:

```javascript
// Use PostgreSQL instead of SQLite
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
```

### MongoDB
For document-based storage:

```javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  readAt: Date,
  createdAt: { type: Date, default: Date.now }
});
```

## Frontend Configuration

Update your frontend to use the deployed backend URL:

```typescript
// src/lib/formSubmission.ts
const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001/api/contact'
  : 'https://your-backend-domain.com/api/contact'; // Your deployed backend URL
```

## Security Checklist

- [ ] Strong JWT secret (32+ random characters)
- [ ] Secure admin password 
- [ ] CORS origins configured for production domains
- [ ] Rate limiting enabled
- [ ] HTTPS/SSL certificate installed
- [ ] Environment variables secured
- [ ] Database backups configured
- [ ] Error logging implemented
- [ ] Health check endpoints added

## Monitoring Setup

### Basic Health Check
Add to your server.js:

```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Log Monitoring
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console()
  ]
});
```

Choose the deployment option that best fits your needs and technical requirements!
