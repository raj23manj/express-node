var books = require('./controllers/books');
var categories = require('./controllers/categories');
var registrations = require('./controllers/registrations');
var authors = require('./controllers/authors');
var bookFeedbacks = require('./controllers/bookFeedbacks');

module.exports = (app) => {
  app.use('/books', books);
  app.use('/authors', authors);
  app.use('/categories', categories);
  app.use('/registrations', registrations);
  app.use('/book_feedbacks', bookFeedbacks);

  // to set global loggedin user
  app.get('*', function(req, res, next){
    global.authenticatedUser = req.user[0].id || null;
    next();
  });
}