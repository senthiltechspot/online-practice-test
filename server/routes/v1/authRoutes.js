import express from 'express';
const router = express.Router();
import { signup, login, googleOAuth } from '../../controllers/authController.js';
// Sign up route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Google OAuth route
router.post('/google', googleOAuth);

export default router