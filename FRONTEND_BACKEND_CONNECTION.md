# Frontend-Backend Connection Guide

## ✅ Connection Status

Your frontend and backend are now **FULLY CONNECTED**!

---

## What's Been Implemented

### 1. API Configuration (`frontend/src/config/api.ts`)
- ✅ API base URL configuration
- ✅ Socket.IO URL configuration
- ✅ API helper functions with authentication
- ✅ Auth API (register, login)
- ✅ Quiz API (CRUD operations)
- ✅ User API (profile, leaderboard, results)

### 2. Authentication Integration
- ✅ Login page connected to backend
- ✅ Register functionality
- ✅ JWT token storage
- ✅ Automatic navigation based on user type
- ✅ Error handling with toast notifications

### 3. Real-time Features (Socket.IO)
- ✅ Socket.IO client installed
- ✅ SocketContext created
- ✅ Auto-connect on app load
- ✅ Connection status tracking

### 4. Updated Components
- ✅ Login page with real authentication
- ✅ App.tsx with SocketProvider
- ✅ API configuration ready for all pages

---

## How to Test the Connection

### Step 1: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd realtime-quiz/backend
npm run dev
```
Should show:
```
✅ MongoDB Connected: ...
Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd realtime-quiz/frontend
npm run dev
```
Should show:
```
VITE ready in ...ms
Local: http://localhost:8081/
```

### Step 2: Test Registration

1. Open http://localhost:8081/
2. Click "Go to Login Page"
3. Click "Register" button
4. Fill in the form:
   - Name: Test Student
   - Email: test@student.com
   - Password: test123
   - Roll Number: S001
5. Click "Register as Student"
6. You should see "Registration successful!" toast
7. You'll be redirected to the dashboard

### Step 3: Test Login

1. Go back to login page
2. Click "Login" button
3. Enter credentials:
   - Email: test@student.com
   - Password: test123
4. Click "Login as Student"
5. You should be logged in and redirected

### Step 4: Check Browser Console

Open browser DevTools (F12) and check Console:
- You should see: `✅ Socket connected: [socket-id]`
- This confirms real-time connection is working

---

## API Endpoints Available

### Authentication
```typescript
import { authAPI } from '@/config/api';

// Register
await authAPI.register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  userType: "student",
  rollNo: "S001"
});

// Login
await authAPI.login({
  email: "john@example.com",
  password: "password123"
});
```

### Quiz Management
```typescript
import { quizAPI } from '@/config/api';

// Get all quizzes
const quizzes = await quizAPI.getAll();

// Get quiz by ID
const quiz = await quizAPI.getById(quizId);

// Create quiz (teacher only)
await quizAPI.create(quizData);

// Submit quiz answers
await quizAPI.submit(quizId, answers, timeTaken);

// Get quiz results
const results = await quizAPI.getResults(quizId);
```

### User Data
```typescript
import { userAPI } from '@/config/api';

// Get current user
const user = await userAPI.getMe();

// Get leaderboard
const leaderboard = await userAPI.getLeaderboard();

// Get user's results
const results = await userAPI.getResults();
```

### Real-time Features
```typescript
import { useSocket } from '@/contexts/SocketContext';

function MyComponent() {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Join quiz room
    socket.emit('join-quiz', {
      quizId: 'quiz123',
      userId: 'user123',
      userName: 'John Doe',
      userType: 'student'
    });

    // Listen for events
    socket.on('quiz-started', (data) => {
      console.log('Quiz started!', data);
    });

    return () => {
      socket.off('quiz-started');
    };
  }, [socket]);

  return <div>Connected: {isConnected ? 'Yes' : 'No'}</div>;
}
```

---

## Data Flow

```
Frontend (React)
    ↓
API Request (fetch)
    ↓
Backend (Express) → MongoDB (Data Storage)
    ↓
Response (JSON)
    ↓
Frontend Updates UI

Real-time:
Frontend ←→ Socket.IO ←→ Backend
```

---

## Authentication Flow

1. User fills login/register form
2. Frontend sends request to backend API
3. Backend validates and creates JWT token
4. Token stored in localStorage
5. Token sent with all subsequent API requests
6. Backend verifies token for protected routes

---

## Next Steps

### To Connect More Pages:

1. **Dashboard** - Fetch user's quizzes
```typescript
import { quizAPI } from '@/config/api';

const quizzes = await quizAPI.getAll();
```

2. **Quiz Page** - Load quiz and submit answers
```typescript
const quiz = await quizAPI.getById(quizId);
// ... user takes quiz ...
await quizAPI.submit(quizId, answers, timeTaken);
```

3. **Leaderboard** - Fetch rankings
```typescript
const leaderboard = await userAPI.getLeaderboard();
```

4. **Teacher Dashboard** - Create and manage quizzes
```typescript
await quizAPI.create(quizData);
await quizAPI.update(quizId, updatedData);
await quizAPI.delete(quizId);
```

---

## Troubleshooting

### "Network Error" or "Failed to fetch"
- ✅ Check backend is running on port 5000
- ✅ Check frontend is running on port 8081
- ✅ Verify API_URL in `config/api.ts` is correct

### "Authentication failed"
- ✅ Check email and password are correct
- ✅ Verify user is registered in database
- ✅ Check MongoDB connection in backend

### Socket not connecting
- ✅ Check SOCKET_URL in `config/api.ts`
- ✅ Verify backend Socket.IO is running
- ✅ Check browser console for errors

### CORS errors
- ✅ Backend already configured for CORS
- ✅ CLIENT_URL in backend `.env` should match frontend URL

---

## Environment Variables

### Backend (`.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:8081
```

### Frontend (`src/config/api.ts`)
```typescript
export const API_URL = 'http://localhost:5000/api';
export const SOCKET_URL = 'http://localhost:5000';
```

---

## 🎉 You're All Set!

Your frontend and backend are now connected and ready to use:
- ✅ Authentication working
- ✅ API calls configured
- ✅ Real-time features ready
- ✅ Error handling in place
- ✅ Token management setup

Start building your quiz features! 🚀
