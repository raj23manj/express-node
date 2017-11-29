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

router.post('/login_post', function(req, res, next) {

});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
