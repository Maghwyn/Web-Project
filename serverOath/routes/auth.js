import express from 'express';
import { saveUserRole, onUserSuccessPO, onUserSuccessStudent, resolveAuth } from '../middlewares/login.js';
import { authenticateUser, authenticateResult } from '../controllers/passport.js';
import { sendEmail } from '../middlewares/email.js';

const router = express.Router();

router.get('/google', saveUserRole, authenticateUser );
router.get('/google/callback', authenticateResult, onUserSuccessPO, onUserSuccessStudent, resolveAuth );
router.get('/email', sendEmail)

export default router;