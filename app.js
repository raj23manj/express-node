var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer= require('multer');
var upload = multer({dest: './uploads'});
var expressFlash = require('express-flash');
var session = require('express-session');
var moment = require('moment');
var empty = require('is-empty');
var _ = require('lodash');
var app = express();
var pg = require('pg')
  , pgSession = require('connect-pg-simple')(session);

//Set globally
app.locals.moment = moment;
app.locals.empty = empty;
app.locals._ = _;

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/components',  express.static(__dirname + '/node_modules'));

// session related
app.use(session({
  store: new pgSession({
    //'pg://' + config.username + ':' + config.password + '@' + config.host + '/' + config.database
    conString: "postgres://postgres:postgres@localhost:5432/library_mngt_dev",
    tableName : 'session'
  }),
  secret: "secret",///process.env.FOO_COOKIE_SECRET,
  resave: false,
  saveUninitialized : false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));
app.use(expressFlash());

module.exports = app;

require ('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
