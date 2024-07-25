import express from 'express'
import { updateUser, userDetails } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/user-details', userDetails);
router.put('/update-user', updateUser)

export default router;