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
        const user = await User.findOne({ email: email }).lean();

        const validPassword = user === null ? false : await bcrypt.compare(password, user.password);

        if (!(user && validPassword)) res.status(401).json({ Error: "unauthorized.", message: "email or password invalid" })

        const userForToken = {
            username: user.email,
            id: user._id,
        };

        const token = jwt.sign(userForToken, private_key, {
            expiresIn: "2h",
            algorithm: "RS256",
        });

        res.status(200).send({
            token,
            username: User.email,
            id: User._id
        });
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}

module.exports = exports;