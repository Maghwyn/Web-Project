import express from 'express';
import { saveUserRole, onUserSuccessPO, onUserSuccessStudent, resolveAuth } from '../middlewares/login.js';
import { authenticateUser, authenticateResult } from '../controllers/passport.js';

const router = express.Router();

router.get('/google', saveUserRole, authenticateUser );
router.get('/google/callback', authenticateResult, onUserSuccessPO, onUserSuccessStudent, resolveAuth );

export default router;