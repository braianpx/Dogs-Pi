const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const index = require('./routes/index/router.js');
const dogs = require('./routes/dogs/router.js');
const temperament = require('./routes/temperament/router.js');
const dog = require('./routes/dog/router.js');
const user = require('./routes/user/router.js');
const favorites = require('./routes/favorites/router.js');
const { CORS_URL } = process.env;
require('./db.js');

const server = express();

server.name = 'Api-Dogs-Pi';
// let variable = 'http://localhost:3000';
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CORS_URL); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use('/', index);
server.use('/dogs',dogs)
server.use('/temperament',temperament)
server.use('/dog',dog)
server.use('/user', user)
server.use('/favorites', favorites)
server.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
