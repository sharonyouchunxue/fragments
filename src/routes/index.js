// src/routes/index.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

// version and author from package.json
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version, author } = require('../../package.json');

// Create a router that we can use to mount our API
const router = express.Router();
const app = express();

/**
 * Expose all of our API routes on /v1/* to include an API version.
 */
//router.use(`/v1`, require('./api'));

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get('/', (req, res) => {
  // Client's shouldn't cache this response (always request it fresh)
  res.setHeader('Cache-Control', 'no-cache');
  // Send a 200 'OK' response
  res.status(200).json({
    status: 'ok',
    author,
    // Use your own GitHub URL for this...
    githubUrl: 'https://github.com/sharonyouchunxue/fragments',
    version,
  });
});

module.exports = router;

app.get('/', (req, res) => {
    // Clients shouldn't cache this response (always request it fresh)
    // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#controlling_caching
    res.setHeader('Cache-Control', 'no-cache');
  
    // Send a 200 'OK' response with info about our repo
    res.status(200).json({
      status: 'ok',
      author,
      // TODO: change this to use your GitHub username
      githubUrl: 'https://github.com/sharonyouchunxue/fragments',
      version,
    });
  });

// modifications to src/routes/index.js
// Our authorization middleware
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { authenticate } = require('../authentication');
/**
 * Expose all of our API routes on /v1/* to include an API version.
 * Protect them all so you have to be authenticated in order to access.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
router.use(`/v1`, authenticate(), require('./api'));