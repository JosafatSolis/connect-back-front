const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware
exports.verifyToken = (req, res, next) => {
    // Se utiliza CookieParser para agarrar las cookies que llegan y convertiras a un objeto de JavaScript
    // console.log(req.cookies);
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) return res.status(401).json({ error });
        // Si el token se pudo desencriptar, busca al usuario con el id del token:
        User.findById(decoded.id).then(user => {
            // Agrega un campo al objeto req con el objeto user:
            req.user = user;
            // Continúa con el procesamiento original
            next();
        });
    })
};