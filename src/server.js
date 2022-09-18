// src/server.js

// We want to gracefully shutdown our server
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stoppable = require('stoppable');

// Get our logger instance
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require('./logger');

// Get our express app instance
// eslint-disable-next-line @typescript-eslint/no-var-requires
const app = require('./app');

// Get the desired port from the process environment. Default to `8080`
// eslint-disable-next-line no-undef
const port = parseInt(process.env.PORT || 8080, 10);

// Start a server listening on this port
const server = stoppable(
  app.listen(port, () => {
    // Log a message that the server has started, and which port it's using.
    logger.info({ port }, `Server started`);
  })
);

// Export our server instance so other parts of our code can access it if necessary.
module.exports = server;
