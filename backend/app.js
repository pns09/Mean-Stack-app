require('./config/database');
require('./config/passportConfig');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// manually defined

var cors = require('cors') ;
var mongoose = require('mongoose');
var passport = require('passport');
mongoose.Promise = global.Promise;
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('secretKey', 'nodeRestApi'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);


// function validateUser(req, res, next) {
//   jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
//     if (err) {
//       res.json({status:"error", message: err.message, data:null});
//     }else{
//       // add user id to request
//       req.body.userId = decoded.id;
//       next();
//     }
//   });
  
// }






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
