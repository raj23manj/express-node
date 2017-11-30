const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../server/models/');
const LocalStrategy = require('passport-local').Strategy;

router.get('/signup', function(req, res) {
  res.render('registrations/signup', { });
});

router.post('/register_submit', function(req, res) {
  var user = models.User.build({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  });

  if(!(req.body.password === req.body.confirm_password)){
    res.render('registrations/signup', {errors: [{ path: "Password", message: " And Confirm Password Do Not Match" }]});
  }

  user.validate().then(function(errors) {
    if(errors)
    {
      res.render('registrations/signup', {errors: errors["errors"]});
    }else {
      models.User.createUser(user,function(err, user){
        if(err) throw err;
        console.log(user);
      });
      req.flash('info', 'User register Successfully !');
      res.redirect('/registrations/login');
    }
  });
});

router.get('/login', function(req, res) {
  res.render('registrations/login', { });
});

router.post('/login_post', passport.authenticate('local', {failureRedirect: '/registrations/login', failureFlash: 'Invalid UserName Or Password !'}), function(req, res) {
  req.flash('info', 'Login Successful !');
  res.redirect('/books/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/registrations/login');
});


module.exports = router;

// private functions

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findAll({where: { id: id }}).then((user, err) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},function(username, password, done){
  models.User.findAll({where: {email: username}}).then((user, err) => {
    user = user[0];
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'unknown User'});
    }
    models.User.comparePassword(password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      }else{
        return done(null, false, {message: 'Invalid Password'});
      }
    });

  });

}));