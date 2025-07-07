const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
      success: err.success || false,
      message: err.message || "Something went wrong",
      errors: err.errors || [],
  });
};

export default errorMiddleware;
