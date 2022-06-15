const cors = require('cors');  // add at the top
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var servicePostRouter = require('./routes/servicePost');

var app = express();

app.use(cors());  // add after 'app' is created
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/servicePost', servicePostRouter);


// 404 error handler
app.use(function (req, res) {
    res.status(404).send({ error: 'Not found' });
});

// "catch-all" error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
