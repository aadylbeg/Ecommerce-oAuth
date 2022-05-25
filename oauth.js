const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('./models');

const google_id = '528128109983-thfb53njqlbvlc2rhac2vldjo6rm9ttr.apps.googleusercontent.com'
const google_secret = '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'

passport.use(new GoogleStrategy({
    clientID: google_id,
    clientSectret: google_secret,
    callbackURL: "http://localhost:5000/google/callback",
    // passReqToCallBack: true
},
    function (req, accessToken, refreshToken, profile, done) {
        // return done(null, profile)
        // Users.findOrCreate({ googleId: profile.id }, function (err) {
        //     return done(err, user)
        // })
        Users.findOne({ email: profile.emails[o].value }).then((date) => {
            if (data) { throw console.error(error) };
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser   (function (user, done) {
    done(null, user);
});