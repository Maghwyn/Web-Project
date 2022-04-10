import axios from "axios";
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

            const newUser = new User();
            newUser.setId(id);
            newUser.setFirstName(givenName);
            newUser.setLastName(familyName);
            newUser.setEmail(value);
            newUser.setVerified(verified);

            try {
                const isUserInDatabase = await axios.get(`http://localhost:8080/api/v1/users/g/${id}/${process.env.TOKEN}`)
                .then(res => { return res.data ? true : false;
                }).catch(function(error) { console.log(error)});

                if(isUserInDatabase) { 
                    done(null, newUser.getUser()); 

                    await axios.post("htptp://localhost:8080/api/v1/users/session", {"userGID": id})
                    .then(res => {return res });
                }
                else {
                    const body = {"firstName": givenName, "lastName": familyName, "canView": 1, "email": value, "userGID": id}
                    await axios.post(`http://localhost:8080/api/v1/users`, body)
                    .then(res => {return res});

                    await axios.post("htptp://localhost:8080/api/v1/users/session", {"userGID": id})
                    .then(res => {return res });

                    done(null, newUser.getUser());
                }
            } catch(err) {
                console.log(err);
            }
        }
    ));

    passport.serializeUser(function(user, cb) { cb(null, user); });
    passport.deserializeUser(function(obj, cb) { cb(null, obj); });
}