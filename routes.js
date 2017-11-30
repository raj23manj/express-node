var books = require('./controllers/books');
var categories = require('./controllers/categories');
var registrations = require('./controllers/registrations');

module.exports = (app) => {
  app.use('/books', books);
  app.use('/categories', categories);
  app.use('/registrations', registrations);

  // to set global loggedin user
  app.get('*', function(req, res, next){
    global.authenticatedUser = req.user[0].id || null;
    next();
  });
}
