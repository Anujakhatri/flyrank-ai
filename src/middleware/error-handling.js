// Central error-handling middleware — reads err.status (default 500) and
// returns a uniform { error: message } payload.

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
}

module.exports = errorHandler;
