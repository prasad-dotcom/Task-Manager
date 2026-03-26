const errorHandler = (err, req, res, next) =>{

    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    if(err.name === "CastError"){
        statusCode = 400;
        message = "Invalid ID format";

    }

    if(err.code === 11000){
        statusCode =400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
    }


    if(err.name === "ValidationError"){
        statusCode = 400;
        message = Object.values(err.errors).map((e) => e.message).join(", ");

    }

    res.status(statusCode).json({success:false, message});
};


// 404 Not Found Handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Mongoose Error Handler (CastError, ValidationError, Duplicate Key)
const mongooseErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  } else if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  }

  if (statusCode !== 500) {
    return res.status(statusCode).json({ success: false, message });
  }
  next(err); // Pass to next error handler if not handled here
};

// General/Environment Error Handler
const envErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler, notFound, mongooseErrorHandler, envErrorHandler };

