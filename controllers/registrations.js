const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../server/models/');
const async = require('async');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const pry = require('pryjs')


router.get('/signup', function(req, res) {
  res.render('registrations/signup', { });
});

router.post('/register_submit', function(req, res) {

  var user = models.User.build({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: models.User.generateHash(req.body.password)
  });

  user.validate().then(function(errors) {
    if(errors)
    {
      //new_or_edit(req, res, errors["errors"]);
    }else {
      user.save().then(function() {
        req.flash('info', 'User register Successfully !');
        res.redirect('/books');
      });
    }
  });

});

router.get('/login', function(req, res) {
  res.render('registrations/login', { });
});

router.post('/login_post', function(req, res, next) {
  // ask passport to authenticate
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      // if error happens
      return next(err);
    }

    if (!user) {
      // if authentication fail, get the error message that we set
      // from previous (info.message) step, assign it into to
      // req.session and redirect to the login page again to display
      req.session.messages = info.message;
      return res.redirect('/registrations/login');
    }

    // if everything's OK
    req.logIn(user, function(err) {
      if (err) {
        req.session.messages = "Error";
        return next(err);
      }

      // set the message
      req.session.messages = "Login successfully";
      return res.redirect('/books');
    });

  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

passport.use(new LocalStrategy(function(email, password, done){
  // done is a calback
  models.user.getUserByEmail(email, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'unknown User'});
    }

    models.user.comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      }else{
        return done(null, false, {message: 'Invalid Password'});
      }
    })
  });
}));

module.exports = router;
