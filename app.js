var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const port = 3000;

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');

var app = express();

// ejs view engine setup
var ejs = require("ejs");
app.set("views", __dirname + "\\public");
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});

module.exports = app;
