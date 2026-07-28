function errorHandler(err, req, res, next) {
  // If it's one of our custom errors, it will have a statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Otherwise, it's an unexpected error
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
}

module.exports = { errorHandler };
