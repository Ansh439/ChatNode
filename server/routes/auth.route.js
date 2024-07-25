import express from 'express'
import { checkEmail, checkPassword, logout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/email', checkEmail);
router.post('/password', checkPassword);
router.post('/logout', logout)

export default router;