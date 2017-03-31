var express = require('express');
var router = express.Router();
var models = require('../server/models/index');


/* GET home page. */
router.get('/', function(req, res, next) {
    models.Book.findAll().then(function(data){
        res.render('books/index', { title: 'Books Index', data: data });
        console.log(data);
    });
    // res.render('index', { title: 'Express', data: data });
});

module.exports = router;