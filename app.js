const cors = require('cors');  // add at the top
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var servicePostRouter = require('./routes/servicePost');
var categoriesRouter = require('./routes/categories');
var authRouter = require('./routes/auth');
var bookingsRouter = require('./routes/bookings');
var chatRouter = require('./routes/chat');
var photosRouter = require('./routes/photos');
var tokensRouter = require('./routes/tokens');


var app = express();

app.use(cors());  // add after 'app' is created
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/servicePost', servicePostRouter);
app.use('/categories', categoriesRouter);
app.use('/bookings', bookingsRouter);
app.use('/chat', chatRouter);
app.use('/photos', photosRouter);
app.use('/tokens', tokensRouter);

// 404 error handler
app.use(function (req, res) {
    res.status(404).send({ error: 'Not found' });
});

// "catch-all" error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
