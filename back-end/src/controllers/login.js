const mongoose = require('mongoose');
const User = require('../models/user');
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const private_key = fs.readFileSync("/home/makarov/Documents/projects/React/medic-me/back-end/src/utils/keys/private.pem");

exports.login = async (req, res) => {
    const { email, password } = req.body

    if (!(email || password)) return res.status(500).json({ message: "One or more fields are missing" })

    try {

        // Log the request payload for debugging

        console.log(`Request payload: ${JSON.stringify(req.body)}`);

        const user = await User.findOne({ email: email });

        console.log(`User found: ${JSON.stringify(user)}`); // Added JSON.stringify for better visibility

        const validPassword = user === null ? false : await bcrypt.compare(password, user.password);
        
        if (!(user && validPassword)) return res.status(401).json({ Error: "unauthorized.", message: "email or password invalid" })

        const userForToken = {
            username: user.email,
            id: user._id,
        };

        const token = jwt.sign(userForToken, private_key, {
            expiresIn: "2h",
            algorithm: "RS256",
        });

        res.status(200).json({
            token,
            username: user.email,
            id: user._id
        });
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}

module.exports = exports;