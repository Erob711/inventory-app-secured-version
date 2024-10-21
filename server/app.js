// load environment variables from .env or elsewhere
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');

//Allow CORS requests
app.use(cors());
// logging middleware
app.use(morgan('dev'));
// parsing middleware for form input data & json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, '../dist')));


// DEMO: RATE LIMITER
// Uncomment to show rate limiting 

// const createRateLimitMiddleware = require("./rateLimitMiddleware");
// const appLevelRateLimiter = createRateLimitMiddleware({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 10, // 10 requests per hour
// });
// app.use(appLevelRateLimiter);
// Uncomment to show rate limiting 

// api router
app.use('/', require('./routes'));

// 404 handler
app.use((req, res) => {
  res.status(404).send({ error: '404 - Not Found', message: 'No route found for the requested URL' });
});

// app.use(auth());
// const jwtCheck = auth({
//   audience: 'http://localhost:3000',
//   issuerBaseURL: 'https://dev-57j8ewiwddxcplk2.us.auth0.com/',
//   tokenSigningAlg: 'RS256'
// });

// app.use(jwtCheck);


// error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message, table: error.table });
});

module.exports = app;


