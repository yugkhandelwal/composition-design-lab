# Composition Design Lab - Backend System

This backend system captures and manages contact form submissions from your website.

## Features

- **Contact Form API**: Receives and stores contact form submissions
- **Admin Dashboard**: Web interface to view and manage messages
- **Authentication**: Secure admin login with JWT tokens
- **Message Management**: Mark messages as read/unread, delete messages
- **Statistics**: View message counts and analytics
- **Responsive Design**: Admin dashboard works on desktop and mobile

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

Edit `.env` with your preferred settings:
- `PORT`: Server port (default: 3001)
- `ADMIN_USERNAME`: Admin login username
- `ADMIN_PASSWORD`: Admin login password
- `JWT_SECRET`: Secret key for JWT tokens (change in production!)
- `CORS_ORIGINS`: Allowed frontend URLs

### 3. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3001`

### 4. Access Admin Dashboard
Visit `http://localhost:3001/admin` and login with your admin credentials.

## API Endpoints

### Contact Form Submission
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

### Admin Authentication
```
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "your_password"
}
```

### Get Messages (Admin)
```
GET /api/admin/messages?page=1&limit=20
Authorization: Bearer <jwt_token>
```

### Mark Message as Read (Admin)
```
PATCH /api/admin/messages/:id/read
Authorization: Bearer <jwt_token>
```

### Delete Message (Admin)
```
DELETE /api/admin/messages/:id
Authorization: Bearer <jwt_token>
```

### Get Statistics (Admin)
```
GET /api/admin/stats
Authorization: Bearer <jwt_token>
```

## Database

The system uses SQLite for simplicity. The database file (`database.db`) is created automatically when the server starts.

### Database Schema

**messages** table:
- `id`: Primary key
- `name`: Contact name
- `email`: Contact email
- `subject`: Message subject
- `message`: Message content
- `ip_address`: Sender IP address
- `read_at`: Timestamp when message was read
- `created_at`: Timestamp when message was created

**admin_users** table:
- `id`: Primary key
- `username`: Admin username
- `password_hash`: Bcrypt hashed password
- `created_at`: Account creation timestamp

## Frontend Integration

Update your frontend contact form to send requests to:
- Development: `http://localhost:3001/api/contact`
- Production: `https://your-backend-domain.com/api/contact`

Example JavaScript:
```javascript
const response = await fetch('http://localhost:3001/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'Hello, I would like to discuss...'
  }),
});

const result = await response.json();
if (result.success) {
  console.log('Message sent successfully!');
}
```

## Security Features

- **Rate Limiting**: Prevents spam submissions
- **CORS Protection**: Only allows requests from specified origins
- **Input Validation**: Validates and sanitizes all inputs
- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Authentication**: Secure token-based admin authentication
- **SQL Injection Protection**: Uses parameterized queries

## Production Deployment

### 1. Environment Setup
- Set strong `JWT_SECRET`
- Update `ADMIN_PASSWORD` 
- Set production `CORS_ORIGINS`
- Set `NODE_ENV=production`

### 2. Database Backup
The SQLite database should be backed up regularly:
```bash
cp database.db database_backup_$(date +%Y%m%d).db
```

### 3. Process Management
Use PM2 or similar for production process management:
```bash
npm install -g pm2
pm2 start server.js --name "composition-backend"
pm2 save
pm2 startup
```

### 4. Reverse Proxy
Use nginx or Apache as a reverse proxy:
```nginx
server {
    listen 80;
    server_name your-backend-domain.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Monitoring

The server logs important events to the console. In production, consider:
- Log aggregation (Winston + ELK stack)
- Health check endpoints
- Performance monitoring
- Error tracking (Sentry)

## Troubleshooting

### Common Issues

**CORS Errors**:
- Ensure your frontend URL is in `CORS_ORIGINS`
- Check browser developer console for specific CORS errors

**Database Permissions**:
- Ensure the server has write permissions to the directory
- SQLite file will be created automatically

**Authentication Issues**:
- Check JWT_SECRET is consistent
- Verify admin credentials in .env file
- Clear browser localStorage if needed

**Connection Refused**:
- Verify server is running on correct port
- Check firewall settings
- Ensure backend URL in frontend matches server address

## Support

For issues or questions about the backend system, check:
1. Server console logs
2. Browser developer console
3. Network tab in browser dev tools
4. Database file permissions and location

## Default Credentials

**Admin Dashboard Access**:
- URL: `http://localhost:3001/admin`
- Username: `admin`
- Password: `admin123`

> ⚠️ **Important**: Change the default password in production!
