const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User2 = require("../models/user2");

//Called during login/sign up.
passport.use(new LocalStrategy(User2.authenticate()));

//called while after logging in / signing up to set user details in req.user
passport.serializeUser(User2.serializeUser());
