var express = require('express');
var router = express.Router();
var model_books = require('../server/models/book');


/* GET home page. */
router.get('/books', function(req, res, next) {
    model_books.Book.findAll().then(function(data){
        res.render('index', { title: 'Books', data: data });
        console.log(data);
    });
    // res.render('index', { title: 'Express', data: data });
});

module.exports = router;