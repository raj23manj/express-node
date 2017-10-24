var index = require('./controllers/index');
var users = require('./controllers/users');
var books = require('./controllers/books');
var categories = require('./controllers/categories');

module.exports = (app) => {
  app.use('/', index);
  app.use('/users', users);
  app.use('/books', books);
  app.use('/categories', categories);
}