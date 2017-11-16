const express = require('express');
const router = express.Router();
const models = require('../server/models/');
const multer  = require('multer')
const upload = multer({dest: './uploads'});
const async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  async.parallel({
    books: function(callback) {
      models.Book.findAll({
        include: [models.Author, models.Category],
        order: [
          ['id', 'DESC']
        ]}).then(function(data){
          callback(null, data)
        });
    },
    categories: function(callback) {
      models.Category.findAll({ order: [['name', 'ASC']] }).then(function(data){
        callback(null, data)
      });
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.render('books/index', {title: 'Books Index', data: results.books, categories: results.categories } );
  });
});

router.get('/new', function(req, res, next) {
    models.Category.findAll({ order: [['name', 'ASC']] }).then(function(categories){
      models.Author.findAll({ order: [['name', 'ASC']] }).then(function(authors){
        res.render('books/new', {categories: categories,
                                 authors: authors,
                                 buttonName: 'Create',
                                 object: {}});
      });
    });
});

router.post('/create', upload.single('uploadBookName'), function(req, res) {
    models.Book.create({
        name: req.body.name,
        AuthorId: req.body.AuthorId,
        CategoryId: req.body.CategoryId,
        uploadBookName: req.file.filename
    }).then(function() {
        res.redirect('/books');
    });
});

router.get('/:id/edit', function(req, res) {
    models.Book.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(data){
      models.Category.findAll({ order: [['name', 'ASC']] }).then(function(categories){
        models.Author.findAll({ order: [['name', 'ASC']] }).then(function(authors){
          res.render('books/edit', {categories: categories,
                                    buttonName: 'Submit',
                                    authors: authors,
                                    object: data });
        });
      });
    });
});

router.post('/:id', function(req, res) {
    models.Book.findById(req.params.id).then(function(book){
            if(book){
                book.updateAttributes({
                    name: req.body.name,
                    AuthorId: req.body.AuthorId
                })
            }
        }).then(function(data){
            res.redirect('/books');
    });

});

router.get('/:id/destroy', function (req, res) {
    models.Book.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect('/books');
    });
});

router.get('/search/:category_id', function (req, res) {
  models.Category.findById(req.params.id).then(function(category){
    if(category){

    }
  }).then(function(data){
    res.redirect('/books/search');
  });
});
module.exports = router;