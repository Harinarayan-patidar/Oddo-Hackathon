class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  console.log("🔥 Error caught:", err);
  err.statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message).join(", ");
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Invalid token. Please try again.", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("Token expired. Please login again.", 400);
  }

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = { ErrorHandler, errorHandler };