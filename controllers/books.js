const express = require('express');
const router = express.Router();
const models = require('../server/models/');
const multer  = require('multer')
const upload = multer({dest: './uploads'});

/* GET home page. */
router.get('/', function(req, res, next) {
    models.Book.findAll({
        include: [models.Author],
        order: [
            ['id', 'DESC']
        ]
    }).then(function(data){
        res.render('books/index', { title: 'Books Index', data: data });
    });
});

router.get('/new', function(req, res, next) {
    models.Category.findAll({ order: [['name', 'ASC']] }).then(function(categories){
      models.Author.findAll({ order: [['name', 'ASC']] }).then(function(authors){
        res.render('books/new', {categories: categories, authors: authors, object: {}});
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
        res.render('books/edit', { title: 'Edit Book', data: data });
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

module.exports = router;