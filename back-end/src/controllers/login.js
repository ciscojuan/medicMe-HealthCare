const path = require('path');
const Credentials = require('../models/credentials');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Resuelve la ruta absoluta del archivo private.pem
const privateKeyPath = path.resolve(__dirname, '../utils/keys/private.pem');
const private_key = fs.readFileSync(privateKeyPath);

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password))
    return res.status(500).json({ message: 'One or more fields are missing' });

  try {
    // Log the request payload for debugging

    console.log(`Request payload: ${JSON.stringify(req.body)}`);

    const credentials = await Credentials.findOne({ email: email });

    console.log(`User found: ${JSON.stringify(credentials)}`); // Added JSON.stringify for better visibility

    const validPassword =
      credentials === null
        ? false
        : await bcrypt.compare(password, credentials.password);

    if (!(credentials && validPassword))
      return res
        .status(401)
        .json({ Error: 'unauthorized.', message: 'email or password invalid' });

    const userForToken = {
      username: credentials.email,
      id: credentials._id,
    };

    const token = jwt.sign(userForToken, private_key, {
      expiresIn: '2h',
      algorithm: 'RS256',
    });

    res.status(200).json({
      token,
      username: credentials.email,
      id: credentials._id,
      isAdmin: credentials.isAdmin,
    });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = exports;
