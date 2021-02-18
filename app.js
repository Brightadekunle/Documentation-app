var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const ejsLayout = require('express-ejs-layouts')
const session = require('cookie-session')
const models = require('./models')


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(ejsLayout)

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/public', express.static(__dirname + "/public"))
// app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
      secureProxy: true,
      httpOnly: true,
      domain: 'cookie.com',
  }
}))

// git remote add origin https://github.com/Brightadekunle/Nodejs-Instagramclone.git

app.use(function (req, res, next) {
  // res.locals.login = req.isAuthenticated()
  next()
})

const typeRoutes = require('./routes/typeRoute')
const categoryRoutes = require('./routes/categoryRoute')
const documentRoutes = require('./routes/employeeRoute')
const employeeRoutes = require('./routes/employeeRoute')

app.use('/documentation/type', typeRoutes)
app.use('/documentation/category', categoryRoutes)
app.use('/documentation/document', documentRoutes)
app.use('/documentation/employee', employeeRoutes)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


const PORT = process.env.PORT || 8080

models.sequelize.sync().then(() => {
  app.listen(PORT, console.log(`listening on PORT ${PORT}`))
})
