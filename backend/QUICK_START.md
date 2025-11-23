# Quick Start Guide

## ✅ Backend is Running!

Your backend server is currently running on **http://localhost:5000**

## 🔧 Current Status

- ✅ Server: Running
- ⚠️  Database: Not connected (using local MongoDB which isn't installed)
- ✅ Socket.IO: Ready
- ✅ API Routes: Active

## 🚀 To Connect MongoDB (Choose One Option):

### Option A: MongoDB Atlas (Recommended - 5 minutes)

1. **Go to**: https://www.mongodb.com/cloud/atlas
2. **Sign up** for free account
3. **Create** a free cluster (M0)
4. **Create** database user with username & password
5. **Whitelist** your IP (or allow all: 0.0.0.0/0)
6. **Get** connection string from "Connect" button
7. **Update** `backend/.env` file:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/quizmaster?retryWrites=true&w=majority
```

8. **Restart** the backend server

### Option B: Install MongoDB Locally

**Windows:**
- Download: https://www.mongodb.com/try/download/community
- Install and run as service
- Connection string is already set in .env

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## 📡 Test Your Backend

### Check if server is running:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

### Test with browser:
Open: http://localhost:5000/api/health

## 🔗 Connect Frontend to Backend

Update your frontend to use the backend API:

1. Create `frontend/src/config/api.js`:
```javascript
export const API_URL = 'http://localhost:5000/api';
export const SOCKET_URL = 'http://localhost:5000';
```

2. Use in your components:
```javascript
import { API_URL } from '@/config/api';

// Example API call
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

## 📚 Available API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Quiz
- GET `/api/quiz` - Get all quizzes
- POST `/api/quiz` - Create quiz (teacher)
- GET `/api/quiz/:id` - Get quiz by ID
- POST `/api/quiz/:id/submit` - Submit quiz answers

### Users
- GET `/api/users/me` - Get current user
- GET `/api/users/leaderboard` - Get leaderboard
- GET `/api/users/results` - Get user results

## 🐛 Troubleshooting

### Server won't start:
- Check if port 5000 is already in use
- Try changing PORT in .env file

### MongoDB connection error:
- Verify connection string is correct
- Check if IP is whitelisted (Atlas)
- Ensure MongoDB service is running (local)

### CORS errors:
- Update CLIENT_URL in .env to match your frontend URL
- Default is http://localhost:8081

## 📖 Full Documentation

See `MONGODB_SETUP.md` for detailed MongoDB setup instructions.
See `README.md` for complete API documentation.

## ✨ You're All Set!

Your backend is ready to use. Connect MongoDB to enable data persistence!
