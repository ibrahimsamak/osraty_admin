const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('token');
  if (!token) {
    const response = {
      status_code: 400,
      status: true,
      message: 'Access denied. No token provided.'
    }
    return res.json(response);
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  }
  catch (ex) {
    const response = {
      status_code: 400,
      status: true,
      message:'Invalid token.'
    }
    return res.json(response);
  }
}