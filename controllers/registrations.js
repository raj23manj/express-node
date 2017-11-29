const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../server/models/');
const LocalStrategy = require('passport-local').Strategy;

router.get('/signup', function(req, res) {
  res.render('registrations/signup', { });
});

router.post('/register_submit', function(req, res) {


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
