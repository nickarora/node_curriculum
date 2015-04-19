var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var articles = require('./routes/articles');
var login = require('./routes/login');
var logout = require('./routes/logout');
var post = require('./routes/post');
var authenticate = require('./routes/authenticate');
var api = require('./routes/api');

var mongo = require('mongodb');
var mongoskin = require('mongoskin')
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog';
var db = mongoskin.db(dbUrl, {safe: true});
var collections = {
    articles: db.collection('articles'),
    users: db.collection('users')
};

var app = express();

// persistence
app.use(function(req, res, next){
  if (!collections.articles || ! collections.users) return next(new Error('No collections.'))
  req.collections = collections;
  return next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('layout', 'layout');
app.set('partials', { 
  header: 'header',
  footer: 'footer'
});
app.engine('hjs', require('hogan-express'));
app.enable('view cache');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/post', post);
app.use('/articles', articles);
app.use('/authenticate', authenticate);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
