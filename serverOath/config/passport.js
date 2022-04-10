import { OAuth2Strategy } from "passport-google-oauth";
import User from "../models/user.js";

const GoogleStrategy = OAuth2Strategy;

export default function config(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5001/auth/google/callback"
        },

        async function(accessToken, refreshToken, profile, done) {
            const {id, name, emails} = profile;
            const {familyName, givenName} = name;
            const {value, verified} = emails[0];
            
            if(value.split("@")[1] !== "edu.esiee-it.fr") return done(null, false, "User email isn't from esiee-it.");

            const newUser = new User();
            newUser.setId(id);
            newUser.setFirstName(givenName);
            newUser.setLastName(familyName);
            newUser.setEmail(value);
            newUser.setVerified(verified);

            return done(null, newUser.getUser());
        }
    ));

    passport.serializeUser(function(user, cb) { cb(null, user); });
    passport.deserializeUser(function(obj, cb) { cb(null, obj); });
}