const passport = require('passport');
const User = require('../../users/user.model');
const loginStrategy = require('./loginStrategy');


passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
    } catch (err) {
        return done(err);
    }
});


passport.use('login', loginStrategy);