# QuizMaster - Real-time Quiz Platform

A modern, interactive quiz platform built with React, TypeScript, and MongoDB that enables teachers to create quizzes and students to participate in real-time competitions.

## Features

### For Teachers
- Create custom quizzes with multiple-choice questions
- Set difficulty levels (Easy, Medium, Hard)
- Configure time limits
- View all created quizzes
- Delete quizzes
- Track student performance

### For Students
- View available quizzes
- Attempt quizzes with timer
- See instant results
- Track personal progress
- Compete on leaderboards

### Technical Features
- Real-time updates with Socket.IO
- MongoDB database integration
- JWT authentication
- Role-based access control
- Responsive design with Tailwind CSS
- Beautiful hologram-themed UI

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components
- React Router
- Socket.IO client

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Socket.IO
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vanusshka/realtime-quiz-hub.git
cd realtime-quiz-hub
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Configure environment variables:

Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:8081
NODE_ENV=development
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to:
- Frontend: http://localhost:8081
- Backend API: http://localhost:5000

## Project Structure

```
realtime-quiz/
├── backend/
│   ├── config/          # Database configuration
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Express server
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   ├── pages/       # Page components
│   │   ├── styles/      # CSS styles
│   │   └── config/      # API configuration
│   └── index.html
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Quizzes
- `GET /api/quiz` - Get all quizzes
- `GET /api/quiz/:id` - Get quiz by ID
- `POST /api/quiz` - Create quiz (teacher only)
- `PUT /api/quiz/:id` - Update quiz (teacher only)
- `DELETE /api/quiz/:id` - Delete quiz (teacher only)
- `POST /api/quiz/:id/submit` - Submit quiz answers (student only)
- `GET /api/quiz/:id/results` - Get quiz results

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users/leaderboard` - Get leaderboard
- `GET /api/users/results` - Get user's results

## Database Schema

### User
- name, email, password (hashed)
- userType (student/teacher)
- rollNo (for students)

### Quiz
- title, description, difficulty
- timeLimit, questions[]
- teacherId, isActive
- createdAt

### Result
- quizId, studentId
- answers[], score
- totalQuestions, correctAnswers
- timeTaken, completedAt

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- Built with modern web technologies
- Inspired by interactive learning platforms
- Designed for educational institutions
