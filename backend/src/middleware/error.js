export function notFound(req, _res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const status = error.status || error.statusCode || 500;
  const payload = {
    message: status === 500 ? "Internal server error" : error.message
  };

  if (process.env.NODE_ENV !== "production") {
    payload.stack = error.stack;
    if (error.errors) payload.errors = error.errors;
  }

  res.status(status).json(payload);
}

