import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import sessions from "express-session";
import passport from "passport";
import auth from "./routes/auth.js";
import config from "./config/passport.js";
dotenv.config()
config(passport);

const PORT = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use(sessions({ 
    resave: false, 
    saveUninitialized: true,
    name: "user",
    secret: 'SECRET',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/auth', auth);
app.listen(PORT, () => { console.log(`App running on port ${PORT}.`); });