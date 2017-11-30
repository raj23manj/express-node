const express = require('express');
const router = express.Router();
const models = require('../server/models/');
const {check, validationResult, body} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const ensureAuthentication = require('../controllers/ensureAuthentication');


/* GET home page. */
router.get('/', ensureAuthentication.authenticateUser(), function (req, res, next) {
  models.Category.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(function (data) {
    res.render('categories/index', {title: 'Category Index', data: data, errors: {}});
  });
});

router.get('/new', ensureAuthentication.authenticateUser(), function (req, res, next) {
  res.render('categories/new', {errors: {}, object: {}});
});

router.post('/create', ensureAuthentication.authenticateUser(), function(req, res) {
  var category = models.Category.build({name: req.body.name});
  category.validate().then(function(errors){
    if(errors){
      req.flash('info', 'Correct The Errors !');
      res.render('categories/new', {errors: errors["errors"], object: {}});
    }else{
      category.save().then(function() {
        req.flash('info', 'Created Successfully !');
        res.redirect('/categories/');
      });
    }
  });
});

router.get('/:id/edit', ensureAuthentication.authenticateUser(), function (req, res) {
  models.Category.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    res.render('categories/edit', {object: data});
  });
});

router.post('/:id', ensureAuthentication.authenticateUser(), function (req, res) {
  models.Category.findById(req.params.id).then(function (category) {
    if (category) {
      category.updateAttributes({
        name: req.body.name
      })
    }
  }).then(function (data) {
    res.redirect('/categories');
  });
});

router.get('/:id/destroy', ensureAuthentication.authenticateUser(), function (req, res) {
  models.Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/categories');
  });
});

module.exports = router;
