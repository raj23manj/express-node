const express = require('express');
const router = express.Router();
const models = require('../server/models/');
const ensureAuthentication = require('../controllers/ensureAuthentication');

/* GET home page. */
router.get('/', ensureAuthentication.authenticateUser(), function (req, res, next) {
  models.Author.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(function (data) {
    //console.log(data);
    res.render('authors/index', {title: 'Author Index', data: data, errors: {}});
  });
});

router.get('/new', ensureAuthentication.authenticateUser(), function (req, res, next) {
  res.render('authors/new', {errors: {}, object: {}});
});

router.post('/create', ensureAuthentication.authenticateUser(), function(req, res) {
  var author = models.Author.build({name: req.body.name});
  author.validate().then(function(errors){
    if(errors){
      req.flash('info', 'Correct The Errors !');
      res.render('authors/new', {errors: errors["errors"], object: {}});
    }else{
      author.save().then(function() {
        req.flash('info', 'Created Successfully !');
        res.redirect('/authors/');
      });
    }
  });
});

router.get('/:id/edit', ensureAuthentication.authenticateUser(), function (req, res) {
  models.Author.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    res.render('authors/edit', {object: data});
  });
});

router.post('/:id', ensureAuthentication.authenticateUser(), function (req, res) {
  models.Author.findById(req.params.id).then(function (author) {
    if (author) {
      author.updateAttributes({
        name: req.body.name
      })
    }
  }).then(function (data) {
    res.redirect('/authors');
  });
});

router.get('/:id/destroy', ensureAuthentication.authenticateUser(), function (req, res) {
  models.Author.destroy({
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/authors');
  });
});

module.exports = router;