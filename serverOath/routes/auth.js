import express from 'express';
import passport from 'passport';
import { userSuccess } from '../controllers/login.js';

const router = express.Router();

router.get(
    '/google',
    passport.authenticate('google', { scope : ['profile', 'email'] })
);
router.get(
    '/google/callback', 
    passport.authenticate('google', { failureRedirect: '/error' }), 
    userSuccess
);

export default router;



// import { ensureAuth, ensureGuest } from '../middlewares/auth.js';
// router.get('/login', ensureGuest, (req, res) => { res.render('login') })
// router.get('/log', ensureAuth, async(req,res)=> { res.send(req.user) })
// router.get('/logout', (req, res) => { req.logout(); res.redirect('/');})