var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var config          = require('./config'), settings = config.settings;

var index = require('./routes/index');
var users = require('./routes/users');
var management = require('./routes/management');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.pathView           = getCurrentUrlTag(req.originalUrl);
  res.locals.company_name       = settings.company_name;
  res.locals.company_full_name  = settings.company_full_name;
  res.locals.webRoot            = settings.webRoot;
  next();
});
app.use('/', index);
app.use('/users', users);
app.use('/management', management);

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

function getCurrentUrlTag(url) {
  var base_url = url.split('?')[0];
  if (base_url[0] === '/') {
      base_url = base_url.substr(1 , base_url.length - 1);
  }
  if (base_url[base_url.length - 1] === '/') {
      base_url = base_url.substr(0 , base_url.length - 1);
  }
  var views = base_url.split('/');
  return views.join('_');
}

module.exports = app;
