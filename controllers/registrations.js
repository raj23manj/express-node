const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../server/models/');
const async = require('async');
const path = require('path');

/* GET registrations page. */
router.get('/', function(req, res, next) {
  models.Todo.findAll().then(function(data){
    res.render('index', { title: 'Express', data: data });
  });
});

router.get('/signup', function(req, res) {
  res.render('registrations/signup', { });
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account });
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});


module.exports = router;
