const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const monthlyItemRoutes = require('../routes/monthlyItem');
const userRoutes = require('../routes/user');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


const localUrlDb = 'mongodb://localhost/angBudget';

mongoose.connect(localUrlDb, { promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() =>
    console.log('connection successful')
  ).catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../dist')));

app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  next();
});


app.use('/api/monthlyitems', monthlyItemRoutes);
app.use('/api/user', userRoutes);

// Send all other requests to the Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, /*next*/) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
