const express = require('express');
const router = express.Router();
const models = require('../server/models/');

/* GET home page. */
router.get('/', ensureAuthentication.authenticateUser(), function (req, res, next) {
  models.Author.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(function (data) {
    res.render('authors/index', {title: 'Author Index', data: data, errors: {}});
  });
});