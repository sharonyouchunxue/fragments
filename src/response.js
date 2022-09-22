// src/response.js

/**
 * A successful response looks like:
 *
 * {
 *   "status": "ok",
 *   ...
 * }
 */
 module.exports.createSuccessResponse = function (data) {
    return {
      status: 'ok',
      // TODO ...
      ...data,
    };
  };
  
  /**
   * An error response looks like:
   *
   * {
   *   "status": "error",
   *   "error": {
   *     "code": 400,
   *     "message": "invalid request, missing ...",
   *   }
   * }
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  module.exports.createErrorResponse = function (code, message) {
    // TODO ...
    return {
        status: 'error',
        // TODO ...
        error: {
            code: 404,
            message: 'not found',
        }
    };
  };