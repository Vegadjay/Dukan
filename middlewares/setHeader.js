const requestValidationMiddleware = (req, res, next) => {
  // Log request details
  console.log(`Received ${req.method} request to ${req.path}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  // Check if the request body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Request body is empty or missing'
    });
  }

  // Optional: Add more specific validation
  // For example, checking for required fields
  // const requiredFields = ['name', 'email'];
  // const missingFields = requiredFields.filter(field => !req.body[field]);
  // if (missingFields.length > 0) {
  //   return res.status(400).json({
  //     error: 'Validation Error',
  //     missingFields: missingFields
  //   });
  // }

  // If all checks pass, proceed to the next middleware/route handler
  next();
};
module.exports = requestValidationMiddleware;