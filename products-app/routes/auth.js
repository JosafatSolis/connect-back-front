const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  // Utiliza algoritmo md5, el 10 indica cuántas veces se va a encriptar nuevamente
  bcrypt.hash(password, 10).then((hashedPassword) => {
    const newUsr = { email, password: hashedPassword };
    console.log(newUsr);
    User.create(newUsr).then((createdUsr) => {
      console.log(createdUsr);
      const userWithoutPassword = createdUsr.toObject();
      delete userWithoutPassword.password;
      res.status(200).json({ userWithoutPassword });
    }).catch(err => res.status(400).json(err));
  });
});

router.post("/login", (req, res) => {
    const {email, password} = req.body;
    // Busca si existe el mail registrado
    User.findOne({ email }).then(user => {
         // findOne puede recibir null si no encuentra al usuario
        if (user) {
            //res.status(200).json(user);
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    // User no es un objeto plano hasta antes de aquí, es una instancia de una clase de Mongoose,
                    // se convierte en objeto plano:
                    const userWithoutPassword = user.toObject();
                    // Se le quita el password
                    delete userWithoutPassword.password;
                    // Primero lo que se quiere guardar y luego la llave
                    const token = jwt.sign({id: user._id}, process.env.SECRET);
                    // Se crea la cookie para enviarla al navegador
                    // El nombre de la cookie, después el contenido y después las propiedades
                    res.cookie("token", token, {
                        expires: new Date(Date.now() + 86400000), // +24 Hrs
                        secure: false, // Si es true, sólo se acepta por https
                        httpOnly: true // Para que la cookie no sea accesible desde el navegador, sólo desde el servidor
                    }).json({ userWithoutPassword });
                } else {
                    // Si el usuario existe pero la contraseña es incorrecta:
                    res.status(401).json({mensaje: "El usuario o la contraseña son incorrectos"})
                }
            })
        } else {
            // No se encuentra al usuario
            res.status(401).json({mensaje: "El usuario o la contraseña son incorrectos"})
        }
    })
})

module.exports = router;
