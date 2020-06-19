const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken } = require("../utils/verifyToken");
const { checkRole } = require("../utils/chekRole");

/* GET users listing. */
// ** Atención: verifyToken tiene que tener la misma firma (req, res, next) por ser un middleware
// Si se quire cambiar la firma para agregar más parámetros, se tiene que definir un middleware que reciba
// los parámetros que necesitamos y que retorne una función con la firma adecuada, ejem. checkRole
router.get('/', verifyToken, checkRole(["Admin","User"]), function(req, res, next) {
  //console.log(req.user);
  // Para obtener sólo los campos que queremos en el populate, se especifican en el siguiente parámetro, separados por espacio
  Product.find().populate("seller", "email createdAt").then( products => {
    res.status(200).json({ result: products });
  }).catch(reason => res.status(400).json(reason));
});

router.post('/', verifyToken, checkRole(["Admin"]), (req, res) => {
  const {_id} = req.user;
  Product.create({...req.body, seller: _id}).then(created => {
    res.status(200).json({result: created});
  }).catch(reason => res.status(500).json(reason));
})

module.exports = router;

// name, image, price, description