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
var _ = require('lodash');
var app = express();
var pg = require('pg')
  , pgSession = require('connect-pg-simple')(session);
var env       = process.env.NODE_ENV || 'development';
var config    = require(path.resolve(__dirname) + '/config.json')[env];
var winston = require('winston'),
  expressWinston = require('express-winston');
var sassMiddleware = require('node-sass-middleware');
var PrettyError = require('pretty-error');
var pry = require('pryjs')

//Set globally
app.locals.moment = moment;
//app.locals._ = _;

global.appRoot = path.resolve(__dirname);
global._ = _;
global.pry = pry;
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  /* Options */
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/components',  express.static(__dirname + '/node_modules'));
app.use('/uploads',  express.static(__dirname + '/uploads'));
app.use('/stylesheets/images/',  express.static(__dirname + '/public/pdf/images/'));
app.use('/locale/',  express.static(__dirname + '/public/pdf/locale/'));
app.use('/pdf/images/',  express.static(__dirname + '/public/pdf/images/'));
app.use('/pdf/cmaps/',  express.static(__dirname + '/public/pdf/cmaps/'));

// session related
app.use(session({
  store: new pgSession({
    conString: "postgres://" + config.username + ':' + config.password + '@' + config.host + '/' + config.database,
    tableName : 'session'
  }),
  secret: "secret", ///process.env.FOO_COOKIE_SECRET,
  resave: false,
  saveUninitialized : false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));
app.use(expressFlash());

expressWinston.requestWhitelist.push('body');

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}} {{req.body}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));

module.exports = app;

require ('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

pe = new PrettyError();
// and use it for our app's error handler:
app.use(function(err, req, res, next){
  console.log(pe.render(err));
  next();
});
