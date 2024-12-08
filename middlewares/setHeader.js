const requestValidationMiddleware = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body is empty or missing'
      });
    }
  }
  
  next();
};

module.exports = requestValidationMiddleware;