const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
var user = require("../models/user");

passport.use(
    new localStrategy({ usernameField: 'name' },
        (username, password, done) => {
            user.findOne({ name: username },
                (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    else if (!user) {
                        return done(null, false, { message: 'user not found' })
                    }
                    else if (!user.verifyPassword(password)) {
                        return done(null, false, { message: "wrong password" })
                    }
                    else {
                        return done(null, user)
                    }
                }
            )
        })
)