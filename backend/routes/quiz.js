const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const auth = require('../middleware/auth');
const { cacheMiddleware, clearCache } = require('../middleware/cache');

// @route   POST /api/quiz
// @desc    Create a new quiz
// @access  Private (Teacher only)
router.post('/', auth, async (req, res) => {
  if (req.user.userType !== 'teacher') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { title, description, difficulty, timeLimit, questions } = req.body;

  try {
    const quiz = new Quiz({
      title,
      description,
      teacherId: req.user.id,
      difficulty,
      timeLimit,
      questions
    });

    await quiz.save();
    
    // Clear quiz cache
    clearCache('cache:/api/quiz*');
    
    res.status(201).json(quiz);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/quiz
// @desc    Get all quizzes
// @access  Private
router.get('/', auth, cacheMiddleware(300), async (req, res) => { // Cache for 5 minutes
  try {
    let quizzes;
    if (req.user.userType === 'teacher') {
      quizzes = await Quiz.find({ teacherId: req.user.id }).sort({ createdAt: -1 });
    } else {
      quizzes = await Quiz.find({ isActive: true }).sort({ createdAt: -1 });
    }
    res.json(quizzes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/quiz/:id
// @desc    Get quiz by ID
// @access  Private
router.get('/:id', auth, cacheMiddleware(600), async (req, res) => { // Cache for 10 minutes
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/quiz/:id
// @desc    Update quiz
// @access  Private (Teacher only)
router.put('/:id', auth, async (req, res) => {
  if (req.user.userType !== 'teacher') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.teacherId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedQuiz);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/quiz/:id
// @desc    Delete quiz
// @access  Private (Teacher only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.userType !== 'teacher') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.teacherId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/quiz/sample-quiz/submit
// @desc    Submit sample quiz results (for frontend sample quiz)
// @access  Private
router.post('/sample-quiz/submit', auth, async (req, res) => {
  const { answers, timeTaken } = req.body;

  try {
    // Calculate score from answers
    let correctAnswers = 0;
    const totalQuestions = answers.length;
    
    answers.forEach(answer => {
      if (answer.isCorrect) correctAnswers++;
    });

    const score = (correctAnswers / totalQuestions) * 100;

    const result = new Result({
      quizId: '000000000000000000000000', // Placeholder ID for sample quiz
      studentId: req.user.id,
      answers: answers.map(a => ({
        questionId: a.questionId,
        selectedAnswer: a.selectedAnswer,
        isCorrect: a.isCorrect,
        timeSpent: a.timeSpent
      })),
      score,
      totalQuestions,
      correctAnswers,
      timeTaken
    });

    await result.save();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/quiz/:id/submit
// @desc    Submit quiz results
// @access  Private (Student only)
router.post('/:id/submit', auth, async (req, res) => {
  if (req.user.userType !== 'student') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { answers, timeTaken } = req.body;

  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    const processedAnswers = answers.map((answer, index) => {
      const question = quiz.questions[index];
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) correctAnswers++;

      return {
        questionId: question._id,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
        timeSpent: answer.timeSpent
      };
    });

    const score = (correctAnswers / quiz.questions.length) * 100;

    const result = new Result({
      quizId: quiz._id,
      studentId: req.user.id,
      answers: processedAnswers,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      timeTaken
    });

    await result.save();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/quiz/:id/results
// @desc    Get quiz results
// @access  Private
router.get('/:id/results', auth, async (req, res) => {
  try {
    const results = await Result.find({ quizId: req.params.id })
      .populate('studentId', 'name email rollNo')
      .sort({ score: -1 });
    
    res.json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
