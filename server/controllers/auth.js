const passport = require("passport");
const User = require("../models/User");
const validator = require("validator");


exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect("/");
    } else {
        res.render("auth");
    }
}

exports.postLogin = (req, res, next) => {
    console.log(req.body);
    const validationErrors = [];
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: "Password cannot be blank." });

    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        return res.redirect('/auth')
      }
      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
    
      passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) {
          req.flash('errors', info)
          return res.redirect('/auth')
        }
        req.logIn(user, (err) => {
          if (err) { return next(err) }
          console.log('User has logged in.')
          req.flash('success', { msg: 'Success! You are logged in.' })
          res.redirect(req.session.returnTo || '/profile')
        })
      })(req, res, next)
}

exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }


exports.postSignup = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: "Password cannot be blank." });
    if (validationErrors.length) {
        req.flash("errors", validationErrors);
        return res.redirect("/auth");
    }
    
        const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        createdAt: Date.now()
    })
    
    User.findOne({$or: [
        {email: req.body.email},
        {userName: req.body.userName}
      ]}, (err, existingUser) => {
        if (err) { return next(err) }
        if (existingUser) {
          req.flash('errors', { msg: 'Account with that email address or username already exists.' })
          return res.redirect('../signup')
        }
        user.save((err) => {
          if (err) { return next(err) }
          req.logIn(user, (err) => {
            if (err) {
              return next(err)
            }
            res.redirect('/profile')
          })
        })
      })
};