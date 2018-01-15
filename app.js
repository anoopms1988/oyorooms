var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressValidator = require('express-validator');

//ROUTES
var index = require('./routes/index');
var users = require('./routes/users');
var location= require('./routes/location');
var hotel   =require('./routes/hotel');
var package =require('./routes/package');

//Config routes
var passport= require('./config/passport');

var app = express();

//database configuration
require('./config/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());  
app.use(expressValidator())
app.post('/auth', passport.authenticate(  
  'local', {
    session: false
  }), serialize, generateToken, respond);
  
  const dbc = {  
    updateOrCreate: function(user, cb){
      // db dummy, we just cb the user
      cb(null, user);
    }
  };

  function serialize(req, res, next) {  
    dbc.updateOrCreate(req.user, function(err, user){
      if(err) {return next(err);}
      // we store the updated information in req.user again
      req.user = {
        id: user.id
      };
      next();
    });
  }
  
 function generateToken(req, res, next) {  
    req.token = jwt.sign({
      id: req.user.id,
    }, 'server secret', {
      expiresIn: 72000
    });
    next();
  }

  function respond(req, res) {  
    res.status(200).json({
      user: req.user,
      token: req.token
    });
  }
 
app.use('/', index);
app.use('/users', users);
app.use('/location', location);
app.use('/hotel', hotel);
app.use('/package', package);

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

module.exports = app;
