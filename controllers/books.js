const express = require('express');
var fs = require('fs');
const router = express.Router();
const models = require('../server/models/');
const multer  = require('multer')
const async = require('async');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ file.originalname)
  }
})

const ensureAuthentication = require('../controllers/ensureAuthentication');

const upload = multer({storage: storage,
                       fileFilter: function (req, file, cb) {
                         if(file.fieldname == 'uploadBookName'){
                          if (path.extname(file.originalname) !== '.pdf'){
                            return cb(new Error('Only pdfs are allowed'))
                          }
                         }
                        cb(null, true)
                       }
                    });

const Xls = require('./../utils/xls');


/* GET home page. */
router.get('/', ensureAuthentication.authenticateUser(), function(req, res, next) {
  // async.parallel({
  //   books: function(callback) {
  //     models.Book.findAll({
  //       include: [models.Author, models.Category],
  //       order: [
  //         ['id', 'DESC']
  //       ]}).then(function(data){
  //       callback(null, data)
  //     });
  //   },
  //   categories: function(callback) {
  //     models.Category.findAll({ order: [['name', 'ASC']] }).then(function(data){
  //       callback(null, data)
  //     });
  //   },
  // }, function(err, results) {
  //   if (err) { return next(err); }
  //   res.render('books/index', {title: 'Books Index', data: results.books, categories: results.categories } );
  // });

  let booksPromise =  models.Book.findAll({include: [models.Author, models.Category],order: [['id', 'DESC']]}),
      categoriesPromise =  models.Category.findAll({ order: [['name', 'ASC']] });

      Promise.all([booksPromise, categoriesPromise])
      .then((results) => {
        res.render('books/index', {title: 'Books Index', data: results[0], categories: results[1] } )
      });
});

router.get('/new', ensureAuthentication.authenticateUser(), function(req, res) {
  new_or_edit(req, res, null);
});

router.post('/create', ensureAuthentication.authenticateUser(), upload.fields([{name: 'uploadBookName', maxCount: 1}, {name: 'uploadBookImage', maxCount: 1}]), function(req, res) {
  var book = models.Book.build({ name: req.body.name,
                                 AuthorId: req.body.AuthorId,
                                 CategoryId: req.body.CategoryId,
                                 uploadBookName: (_.isEmpty(req.files["uploadBookName"])) ? '' : req.files["uploadBookName"][0].filename,
                                 image: (_.isEmpty(req.files["uploadBookImage"])) ? '' : req.files["uploadBookImage"][0].filename,
                                 description: req.body.description
                               });
    book.validate().then(function(errors) {
      if(errors)
      {
        new_or_edit(req, res, errors["errors"]);
      }else {
        book.save().then(function() {
          req.flash('info', 'Created Successfully !');
          res.redirect('/books');
        });
      }
    });
});

router.get('/:id/edit', ensureAuthentication.authenticateUser(), function(req, res) {
    // antipattern
    // models.Book.findOne({
    //     where: {
    //         id: req.params.id
    //     }
    // }).then(function(data){
    //   models.Category.findAll({ order: [['name', 'ASC']] }).then(function(categories){
    //     models.Author.findAll({ order: [['name', 'ASC']] }).then(function(authors){
    //       res.render('books/edit', {categories: categories,
    //                                 buttonName: 'Submit',
    //                                 authors: authors,
    //                                 object: data });
    //     });
    //   });
    // });
    
    // still anti pattern using variable

    // let user;
    // models.Book.findOne({where: { id: req.params.id}})
    // .then((data) => { user = data })
    // .then(() => { 
    //   return Promise.all([models.Category.findAll({ order: [['name', 'ASC']] }), models.Author.findAll({ order: [['name', 'ASC']] })])
    //  })
    // .then((results) => {
    //   res.render('books/edit', {categories: results[0],
    //                             buttonName: 'Submit',
    //                             authors: results[1],
    //                             object: user });
    // });

    let bookPromise = models.Book.findOne({where: { id: req.params.id}}),
        authorsPromise = models.Author.findAll({ order: [['name', 'ASC']] }),
        categoriesPromise = models.Category.findAll({ order: [['name', 'ASC']] });

        Promise.all([bookPromise, authorsPromise, categoriesPromise])
        .then((results) => {
          res.render('books/edit', {categories: results[2],
                                    buttonName: 'Submit',
                                    authors: results[1],
                                    object: results[0] });
        });
});

router.post('/:id', ensureAuthentication.authenticateUser(), function(req, res) {
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

router.get('/:id/destroy', ensureAuthentication.authenticateUser(), function (req, res) {
    models.Book.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect('/books');
    });
});

router.get('/search/:category_id', function (req, res) {
  async.parallel({
    books: function(callback) {
      models.Book.findAll({
        where: {
          CategoryId: req.params.category_id
        },
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

router.get('/search', function (req, res) {
  async.parallel({
    books: function(callback) {
      models.Book.findAll({
        where: {
            name: {
              $like: '%'+req.query.search+'%'
            }
        },
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
    res.render('books/search.jade', {data: results.books, categories: results.categories })
  });
});

router.get('/show/:id', ensureAuthentication.authenticateUser(), function(req, res) {
  models.Book.find({where: {id: req.params.id}, include: [models.Author, models.Category] }).then(function(book){
    res.render('books/show', {book: book});
  });
});

router.get('/:id/view_pdf', ensureAuthentication.authenticateUser(), function(req, res){
  models.Book.find({where: {id: req.params.id}}).then(function(book){
    res.render('books/viewer',{book: book});
  });
});

router.get('/download_xls', (req, res) => {
  let xls = new Xls ('./excel_uploads/temp.xlsx');
  xls.download().then(function() {
    console.log('file is written');
    res.download('./excel_uploads/temp.xlsx');
  });
});

router.get('/import_date', (req, res) => {
  let xls = new Xls ('./excel_uploads/temp.xlsx');
  let dataInsert = [], rowValues = null, rowArray = [];
  xls.import()
  .then(data => {
    data[0].eachRow(function(row, rowNumber) {
      if (rowNumber == 1){
        return;
      };
      rowArray.push({id: row.values[1], name: row.values[2], date: row.values[3]});
    });
    return rowArray;
  })
  .then(objects => {
    models.ImportData.bulkCreate(objects)
    .then(() => { console.log("imported sucessfully") });
  });
});

module.exports = router;

var new_or_edit = function(req, res, errors){
  return models.Category.findAll({ order: [['name', 'ASC']] }).then(function(categories){
    models.Author.findAll({ order: [['name', 'ASC']] }).then(function(authors){
        res.render('books/new', {categories: categories,
        authors: authors,
        buttonName: 'Create',
        errors:  errors,
        object: {}});
    });
  });
}
