# QuizMaster Backend

Real-time quiz application backend built with Node.js, Express, Socket.IO, and MongoDB.

## Features

- User authentication (JWT)
- Real-time quiz functionality with Socket.IO
- Teacher and Student roles
- Quiz creation and management
- Live leaderboard
- Result tracking and analytics

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:

### Generate a JWT Secret:
```bash
# Run this command to generate a secure random secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the output and use it as your `JWT_SECRET` in `.env`

### Get a Gemini API Key (Required for AI quiz generation):
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
- Sign in with your Google account
- Click "Create API Key"
- Copy the API key and paste it in your `.env` file as `GEMINI_API_KEY`
- The API has a free tier, so you can start using it immediately!

### Your `.env` should look like:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27018/quizmaster
JWT_SECRET=<your_generated_secret_from_above>
NODE_ENV=development
GEMINI_API_KEY=<your_gemini_api_key>
```

## Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Quiz Management
- `POST /api/quiz` - Create quiz (Teacher only)
- `GET /api/quiz` - Get all quizzes
- `GET /api/quiz/:id` - Get quiz by ID
- `PUT /api/quiz/:id` - Update quiz (Teacher only)
- `DELETE /api/quiz/:id` - Delete quiz (Teacher only)
- `POST /api/quiz/:id/submit` - Submit quiz answers (Student only)
- `GET /api/quiz/:id/results` - Get quiz results

### User
- `GET /api/users/me` - Get current user
- `GET /api/users/leaderboard` - Get leaderboard
- `GET /api/users/results` - Get user's quiz results

## Socket.IO Events

### Client to Server
- `join-quiz` - Join a quiz room
- `start-quiz` - Start quiz (Teacher only)
- `submit-answer` - Submit answer
- `get-leaderboard` - Request leaderboard update
- `end-quiz` - End quiz (Teacher only)

### Server to Client
- `user-joined` - User joined quiz
- `user-left` - User left quiz
- `quiz-started` - Quiz has started
- `answer-submitted` - Answer was submitted
- `leaderboard-update` - Leaderboard data
- `quiz-ended` - Quiz has ended

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── middleware/
│   └── auth.js            # Authentication middleware
├── models/
│   ├── User.js            # User model
│   ├── Quiz.js            # Quiz model
│   └── Result.js          # Result model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── quiz.js            # Quiz routes
│   └── users.js           # User routes
├── .env.example           # Environment variables example
├── .gitignore            # Git ignore file
├── package.json          # Dependencies
├── README.md             # This file
└── server.js             # Main server file
```

## MongoDB Setup

### Local MongoDB:
1. Install MongoDB on your system
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/quizmaster`

### MongoDB Atlas (Cloud):
1. Create account at mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env

## Security Notes

- Change JWT_SECRET in production
- Use HTTPS in production
- Enable CORS only for trusted origins
- Implement rate limiting for API endpoints
- Validate and sanitize all inputs

## License

ISC
