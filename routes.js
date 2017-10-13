var index = require('./controllers/index');
var users = require('./controllers/users');
var books = require('./controllers/books');

module.exports = (app) => {
  app.use('/', index);
  app.use('/users', users);
  app.use('/books', books);
}