const express = require('express');
const router = express.Router();
const models = require('../server/models/');
const {check, validationResult, body} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');


/* GET home page. */
router.get('/', function (req, res, next) {
  models.Category.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(function (data) {
    res.render('categories/index', {title: 'Category Index', data: data});
  });
});

router.get('/new', function (req, res, next) {
  res.render('categories/new', {object: {}});
});

router.post('/create', function(req, res) {
  var category = models.Category.build({name: req.body.name});
  errors = category.validate();
    if(errors){
      req.flash('info', 'Correct The Errors !');
      res.render('categories/new', {errors: errors, object: {}});
    }else{
      category.save().then(function() {
        req.flash('info', 'Created Successfully !');
        res.redirect('/categories');
      });
    }
  });

router.get('/:id/edit', function (req, res) {
  models.Category.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    res.render('categories/edit', {object: data});
  });
});

router.post('/:id', function (req, res) {
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

router.get('/:id/destroy', function (req, res) {
  models.Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/categories');
  });
});

module.exports = router;
