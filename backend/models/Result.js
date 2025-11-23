const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.Mixed, // Can be ObjectId or Number (index)
    required: true
  },
  selectedAnswer: {
    type: Number,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number // in seconds
  }
});

const resultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [answerSchema],
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number // in seconds
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', resultSchema);
