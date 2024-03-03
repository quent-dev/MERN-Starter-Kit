const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt")




module.exports = (passport) => {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            bcrypt.hash(password, 10, function(err, hash) {
                if (err) {
                    return done(err);
                } else {
                    password = hash
                    User.findOne({ username: username }, function (err, user) {
                        if (err) { return done(err); }
                        if (!user) { 
                            return done(null, false); }
                        if (user.password != password) { 
                            return done(null, false); }
                        return done(null, user);
                      });
                }
            })
        }
      ));

    passport.serializeUser(function(user, done) {
            done(null, user);
            });

    passport.deserializeUser(function(user, done) {
            done(null, user);
    });
}