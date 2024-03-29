// src/app.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require('helmet');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const compression = require('compression');

// version and author from our package.json file
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
const { version, author } = require('../package.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require('./logger');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pino = require('pino-http')({
  // Use our default logger instance, which is already configured
  logger,
});

// Create an express app instance we can use to attach middleware and HTTP routes
const app = express();

// modifications to src/app.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const passport = require('passport');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const authorization = require('./authorization');
// Use gzip/deflate compression middleware
app.use(compression());

// Set up our passport authorization middleware
passport.use(authorization.strategy());
app.use(passport.initialize());

// Use logging middleware
app.use(pino);

// Use security middleware
app.use(helmet());

// Use CORS middleware so we can make requests across origins
app.use(cors());

// Use gzip/deflate compression middleware
app.use(compression());

// Define a simple health check route. If the server is running
// we'll respond with a 200 OK.  If not, the server isn't healthy.

// modifications to src/app.js

// Remove `app.get('/', (req, res) => {...});` and replace with:

// Define our routes
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use('/', require('./routes'));
// Add 404 middleware to handle any requests for resources that can't be found
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: {
      message: 'not found',
      code: 404,
    },
  });
});

// Add error-handling middleware to deal with anything else
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  // We may already have an error response we can use, but if not, use a generic
  // 500 server error and message.
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  // If this is a server error, log something so we can see what's going on.
  if (status > 499) {
    logger.error({ err }, `Error processing request`);
  }

  res.status(status).json({
    status: 'error',
    error: {
      message,
      code: status,
    },
  });
});

// Export our `app` so we can access it in server.js
module.exports = app;
