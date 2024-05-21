import express from 'express';
import { auth } from '../../middleware/authMiddleware.js';
import { evaluateQuiz, startQuiz } from '../../controllers/quizController.js';
const router = express.Router();

// Start quiz route
router.get('/start', auth, startQuiz);

// Evaluate quiz route
router.post('/evaluate', auth, evaluateQuiz);

export default router;
