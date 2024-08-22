const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');
// Resuelve la ruta absoluta del archivo private.pem
const publicKeyPath = path.resolve(__dirname, '../utils/keys/private.pem');
const public_key = fs.readFileSync(publicKeyPath);

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('Authorization header missing');
    }
    // Separate Bearer
    const [, token] = authorization.split(' ');
    console.log('Token received:', token); // Print the token
    const payload = jwt.verify(token, public_key);

    console.log(payload);
    req.user = payload;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ message: 'Unauthorized!' });
  }
};

module.exports = {
  /*     requestLogger,
    unknownEndpoint,
    errorHandler, */
  auth,
};
