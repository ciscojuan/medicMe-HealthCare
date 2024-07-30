const jwt = require("jsonwebtoken");
const fs = require("fs");
const public_key = fs.readFileSync("/home/makarov/Documents/projects/React/medic-me/back-end/src/utils/keys/public.pem");

const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new Error("Authorization header missing");
        }
        // Separate Bearer
        const [, token] = authorization.split(" ");
        console.log("Token received:", token); // Print the token
        const payload = jwt.verify(token, public_key);

        console.log(payload);
        req.user = payload;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ message: "Unauthorized!" });
    }
};

module.exports = {
/*     requestLogger,
    unknownEndpoint,
    errorHandler, */
    auth
};