var index = require('./controllers/index');
var users = require('./controllers/users');
var books = require('./controllers/books');
var categories = require('./controllers/categories');
var registrations = require('./controllers/registrations');

module.exports = (app) => {
  app.use('/', index);
  app.use('/users', users);
  app.use('/books', books);
  app.use('/categories', categories);
  app.use('/registrations', registrations);
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/registrations/login');
}
