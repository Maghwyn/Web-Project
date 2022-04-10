import passport from "passport";

export function authenticateUser(req, res, next) {
    passport.authenticate('google', { scope : ['profile', 'email'], state: res.locals.role })(req,res,next)
}

export function authenticateResult(req, res, next) {
    passport.authenticate('google', { failureRedirect: '/error' })(req,res,next)
}