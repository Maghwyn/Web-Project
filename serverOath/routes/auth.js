import express from 'express';
import { saveUserRole, onUserSuccessPO, onUserSuccessStudent, resolveAuth } from '../middlewares/login.js';
import { authenticateUser, authenticateResult } from '../controllers/passport.js';

const router = express.Router();

router.get('/google', saveUserRole, authenticateUser );
router.get('/google/callback', authenticateResult, onUserSuccessPO, onUserSuccessStudent, resolveAuth );

export default router;



// import { ensureAuth, ensureGuest } from '../middlewares/auth.js';
// router.get('/login', ensureGuest, (req, res) => { res.render('login') })
// router.get('/log', ensureAuth, async(req,res)=> { res.send(req.user) })
// router.get('/logout', (req, res) => { req.logout(); res.redirect('/');})